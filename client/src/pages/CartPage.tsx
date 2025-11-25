import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import TitleTrashLine from "../components/Cart/TitleTrashLine/TitleTrashLine";
import {Container} from "../components/Container";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import CartProductsListItem from "../components/Cart/CartProductsListItem/CartProductsListItem";
import {IProduct} from "../types/Product";
import {productSlice} from "../store/reducers/productSlice";
import {clearCart, getCartProducts, loadAllProducts, removeProductFromCart} from "../store/reducers/ActionCreators";
import CartBuySection from "../components/Cart/CartBuySection/CartBuySection";
import {notificationSlice} from "../store/reducers/notificationSlice";
import {NotificationType} from "../types/INotification";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../types/consts";
import CartEmptySection from "../components/Cart/CartEmptySection/CartEmptySection";
import useDocumentTitle from "../hooks/useDocumentTitle";

const CartMain = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin: 90px 0;
`

const CartWrapper = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin: auto;
    max-width: 780px;
    width: 630px;
`



const CartPage = () => {
    const {products: cartProducts, isLoading: isLoadingCart} = useAppSelector(state => state.cartReducer);
    const {products: allProducts, isLoading: isLoadingProducts} = useAppSelector(state => state.productReducer);
    const [loaded, setLoaded] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {isAuth, id} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();


    useDocumentTitle('Корзина | ' + process.env.REACT_APP_NAME);
    useEffect(() => {
        if(isAuth && id !== undefined) {
            dispatch(loadAllProducts());
            dispatch(getCartProducts(id))
        }
    }, [isAuth]);

    useEffect(() => {
        if(!isLoadingCart && !isLoadingProducts) {
            setLoaded(true);
        } else {
            setLoaded(false);
        }
    }, [isLoadingCart, isLoadingProducts]);

    const handleBuy = () => {
        if(!isAuth || id === undefined) {
            dispatch(notificationSlice.actions.addNotification({
                id: Date.now(),
                type: NotificationType.WARNING,
                duration: 3000,
                message: "Вы не авторизованы",
                count: 1
            }));
            return;
        }
        dispatch(clearCart(id))
            .then(() => {
                dispatch(notificationSlice.actions.addNotification({
                    id: Date.now(),
                    type: NotificationType.SUCCESS,
                    duration: 3000,
                    message: "Успешная покупка!",
                    count: 1
                }))
            })
            .then(() => {
                navigate(SHOP_ROUTE);
            });
    }

    const handleDelete = useCallback((productId: number) => {
        if(!isAuth || id === undefined) {
            dispatch(notificationSlice.actions.addNotification({
                id: Date.now(),
                type: NotificationType.WARNING,
                duration: 3000,
                message: "Вы не авторизованы",
                count: 1
            }));
            return;
        }
        dispatch(removeProductFromCart(id, productId))
    }, [isAuth, id, dispatch]);

    const handleClearCart = () => {
        if(!isAuth || id === undefined) {
            dispatch(notificationSlice.actions.addNotification({
                id: Date.now(),
                type: NotificationType.WARNING,
                duration: 3000,
                message: "Вы не авторизованы",
                count: 1
            }));
            return;
        }
        dispatch(clearCart(id)).then(() => {
            dispatch(notificationSlice.actions.addNotification({
                id: Date.now(),
                type: NotificationType.INFO,
                duration: 3000,
                message: "Корзина очищена!",
                count: 1
            }));
        });
    }

    const calculateSum = useMemo(() => {
        if(!loaded) return 0;
        return cartProducts.reduce((acc, value) => acc + value.count * allProducts[value.productId].price, 0)
    }, [cartProducts, loaded, allProducts]);


    return (
        <CartMain>
            <CartWrapper>
                {(loaded && !cartProducts.length)
                    ?
                        <CartEmptySection />
                    :
                        <>
                            <TitleTrashLine handleClearCart={handleClearCart} />
                            {loaded && cartProducts.map((cartProduct) => {
                                const product: IProduct = allProducts[cartProduct.productId];
                                if(!product) return <></>
                                return <CartProductsListItem
                                    key={cartProduct.id}
                                    cartProduct={cartProduct}
                                    product={product}
                                    setCount={(count: number) => {}}
                                    handleDelete={() => handleDelete(cartProduct.productId)}
                                />;
                            })}
                            <CartBuySection sum={calculateSum} handleBuy={handleBuy} />

                        </>
                }



            </CartWrapper>
        </CartMain>
    );
};

export default CartPage;