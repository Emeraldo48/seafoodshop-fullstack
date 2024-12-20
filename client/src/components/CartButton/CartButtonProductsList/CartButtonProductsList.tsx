import React, {useEffect, useMemo} from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {loadAllProducts} from "../../../store/reducers/ActionCreators";
import {IProduct} from "../../../types/Product";
import CartButtonProductsListItem from "./CartButtonProductsListItem/CartButtonProductsListItem";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 6px 0 13px;
`

const ListWrapper = styled.div`
    padding: 20px 0 10px;
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: 2px;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
        width: 5px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: var(--color-text-secondary);
        border-radius: 5px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: var(--color-scrollbar-track);
        border-radius: 5px;
    }
`

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-md);
    font-weight: var(--fw-bold);
    margin-bottom: 10px;
    padding: 10px 30px;
    margin-top: 20px;
`


const CartButtonProductsList = () => {
    const {products:cartProducts, isLoading:cartProductsLoading, error} = useAppSelector(state => state.cartReducer);
    const allProducts: Record<number, IProduct> = useAppSelector(state => state.productReducer.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(Object.keys(allProducts).length === 0) {
            dispatch(loadAllProducts())
        }
    }, []);

    const calculateTotalPrice = useMemo(() => {
        if(cartProductsLoading || Object.keys(allProducts).length === 0) return 0
        return cartProducts.reduce((acc, value) => acc + value.count * allProducts[value.productId].price, 0)
    }, [cartProducts, allProducts]);

    return (
        <Wrapper>
            <ListWrapper>
                {!cartProductsLoading && Object.keys(allProducts).length !== 0 && cartProducts.map(cartProduct => {

                    const product: IProduct = allProducts[cartProduct.productId];

                    return <CartButtonProductsListItem key={cartProduct.id} cartProduct={cartProduct} product={product} />

                    }
                )}

            </ListWrapper>
            <TotalPrice>
                <span>Итого:</span>
                <span>{calculateTotalPrice} ₽.</span>
            </TotalPrice>
        </Wrapper>
    );
};

export default CartButtonProductsList;