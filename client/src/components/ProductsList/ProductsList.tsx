import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import {useQuery} from "@apollo/client";
import {GET_ALL_CATEGORIES} from "../../graphql/query/category";
import {ICategory} from "../../types/Category";
import {IProduct} from "../../types/Product";
import {GET_ALL_PRODUCTS} from "../../graphql/query/product";
import {Container} from "../Container";
import ProductsItem from "../ProductsItem/ProductsItem";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {modalSlice} from "../../store/reducers/modalSlice";
import ProductModal from "../Modal/ProductModal";
import {addProductToCart} from "../../store/reducers/ActionCreators";
import {notificationSlice} from "../../store/reducers/notificationSlice";
import {NotificationType} from "../../types/INotification";

const Wrapper = styled.main`
    
`

const ProductsSection = styled.section`
    margin-bottom: 30px;
    scroll-margin-top: 80px;
`

const ProductsTitle = styled.h2`
    font-size: var(--font-size-bg);
    margin: 30px 0 10px;
`

const ProductsWrapper = styled.div`
    display: grid;
    grid-gap: 26px;
    grid-template-columns: repeat(4, 1fr);
`

const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    align-items: center;
    height: 200px;
    
    & h2 {
        font-size: var(--font-size-bg);
        color: var(--color-text-primary);
    }
    
    & p {
        font-size: var(--font-size-md);
        color: var(--color-text-secondary);
    }
`

interface ProductsCategory {
    category: ICategory
    products: IProduct[]
}
const ProductsList = () => {

    const {isAuth, id} = useAppSelector(state => state.userReducer);
    const {products:cartProducts, error:cartError} = useAppSelector(state => state.cartReducer);
    const [products, setProducts] = useState<ProductsCategory[]>([]);
    const dispatch = useAppDispatch();

    const {data, loading, error:categoriesError} = useQuery(GET_ALL_CATEGORIES);
    const {data:productData, loading:productLoading, error:productError} = useQuery(GET_ALL_PRODUCTS);
    const [loaded, setLoaded] = useState(false);

    const handleProductClick = useCallback((product: IProduct) => {

        dispatch(modalSlice.actions.setModalWindow({
            Component: ProductModal,
            data: {product}
        }))
    }, [dispatch]);

    const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => {
        e.stopPropagation();
        if(id === undefined) {
            dispatch(notificationSlice.actions.addNotification({
                id: Date.now(),
                type: NotificationType.WARNING,
                duration: 3000,
                message: "Вы не авторизованы"
            }))
            return;
        }

        dispatch(addProductToCart(id, product.id));
        dispatch(notificationSlice.actions.addNotification({
            id: Date.now(),
            type: NotificationType.SUCCESS,
            message: "Товар добавлен в корзину",
            duration: 3000,
        }))
    }, [id, dispatch]);
    useEffect(() => {
        if(!loading && !productLoading && !categoriesError && !productError) {
            const prodObj: Record<number, ProductsCategory> = productData.getProducts.products.reduce((acc:Record<number, ProductsCategory>, value:IProduct) => {
                if(!acc.hasOwnProperty(value.categoryId)) {
                    acc[value.categoryId] = {
                        category: data.getCategories.find((category: ICategory) => category.id == value.categoryId) || {},
                        products: []
                    };
                }
                acc[value.categoryId].products.push(value);
                return acc;
            }, {});
            const prodArr = Object.values(prodObj);
            setProducts(prodArr);
            setLoaded(true);
        } else {
            setLoaded(false);
        }
    }, [data, productData]);

    if(cartError || categoriesError || productError) {
        return (
            <ErrorWrapper>
                <h2>При загрузке ассортимента произошла ошибка</h2>
                <p>Пожалуйста, вернитесь к нам позже</p>
            </ErrorWrapper>
        )
    }

    return (
        <Container>
            <Wrapper>
                {loaded && products.map(productsCategory =>
                    <ProductsSection key={productsCategory.category.name} data-anchor-id={productsCategory.category.name.replaceAll(" ", "-")}>
                        <ProductsTitle>{productsCategory.category.name}</ProductsTitle>
                        <ProductsWrapper>
                            {productsCategory.products.map(product => {
                                    return <ProductsItem
                                        handleButtonClick={handleButtonClick}
                                        handleProductClick={handleProductClick}
                                        key={product.name}
                                        card={product}
                                        cartProduct={cartProducts.find(cartProduct => cartProduct.productId == product.id)}
                                    />
                                }
                            )}
                        </ProductsWrapper>
                    </ProductsSection>
                )}
            </Wrapper>
        </Container>

    );
};

export default ProductsList;