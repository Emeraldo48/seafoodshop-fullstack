import React, {FC, MutableRefObject, useEffect, useRef} from 'react';
import ProductsItem from "../ProductsItem/ProductsItem";
import styled from "styled-components";
import {ProductsCategory} from "../ProductsList/ProductsList";
import {IProduct} from "../../types/Product";
import {ICartProduct} from "../../types/ICartProduct";
import {ICategory} from "../../types/Category";

const Wrapper = styled.section`
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

interface ProductsSectionProps {
    productsCategory: ProductsCategory
    handleButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => void
    handleProductClick: (product: IProduct, category: ICategory) => void
    cartProducts: ICartProduct[]
    parentRef: MutableRefObject<null | HTMLDivElement>
}

const ProductsSection: FC<ProductsSectionProps> = ({productsCategory, handleProductClick, handleButtonClick, cartProducts, parentRef}) => {
    const childRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const [,categoryPath, productPath] = window.location.pathname.split("/").map(el=>el.replace("/",""));
        const child = childRef.current as HTMLDivElement;
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && categoryPath !== productsCategory.category.slug) {
                window.history.pushState(null, "", `/${productsCategory.category.slug}`);
            }
        }, {
            threshold: 0.6
        });
        observer.observe(child);
        if(categoryPath === productsCategory.category.slug) {
            child.scrollIntoView();
        }
        if(productPath) {
            const activeProduct = productsCategory.products.find(product => product.slug === productPath);
            if(activeProduct) {
                handleProductClick(activeProduct, productsCategory.category);
            }
        }
        return () => {
            observer.unobserve(child);
        }
    }, [parentRef, childRef, handleProductClick, productsCategory]);

    return (
        <Wrapper
            key={productsCategory.category.slug}
            data-anchor-id={productsCategory.category.slug}
            ref={childRef}
        >
            <ProductsTitle>{productsCategory.category.name}</ProductsTitle>
            <ProductsWrapper>
                {productsCategory.products.map(product => {
                        return <ProductsItem
                            handleButtonClick={handleButtonClick}
                            handleProductClick={() => handleProductClick(product, productsCategory.category)}
                            key={product.slug}
                            card={product}
                            cartProduct={cartProducts.find(cartProduct => cartProduct.productId === product.id)}
                        />
                    }
                )}
            </ProductsWrapper>
        </Wrapper>
    );
};

export default ProductsSection;