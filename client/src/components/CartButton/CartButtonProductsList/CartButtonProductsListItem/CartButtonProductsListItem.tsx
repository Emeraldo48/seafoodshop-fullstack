import React, {FC, useState} from 'react';
import styled, {css} from "styled-components";
import {FaTrash} from "react-icons/fa6";
import Counter from "../../../Counter/Counter";
import {ICartProduct} from "../../../../types/ICartProduct";
import {IProduct} from "../../../../types/Product";
import {addProductToCart, removeProductFromCart, takeProductFromCart} from "../../../../store/reducers/ActionCreators";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";

const ProductItem = styled.div<{$isLoading: boolean}>`
    padding: 10px 0 15px;
    margin: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 10px;
    border-bottom: 1px solid var(--color-text-secondary);
    
    ${props => props.$isLoading && css`
        opacity: 0.5;
        pointer-events: none;
    `}
`

const ProductItemImageWrapper = styled.div`
    width: 60px;
`

const ProductItemImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 10px;
`

const ProductItemInfo = styled.div`
    flex: 1;
`

const ProductItemNameLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ProductItemName = styled.h3`
    color: var(--color-text-primary);
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 190px;
`

const TrashCan = styled(FaTrash)`
    color: var(--color-text-secondary);
    cursor: pointer;
    
    &:hover {
        color: var(--color-red);
    }
`

const ProductItemWeight = styled.p`
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin-top: 5px;
`

const ProductItemPriceOptionsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
`

const ProductItemPrice = styled.p`
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
`

interface CartButtonProductsListItemProps {
    cartProduct: ICartProduct
    product: IProduct
}

const CartButtonProductsListItem: FC<CartButtonProductsListItemProps> = ({cartProduct, product}) => {

    const [value, setValue] = useState(cartProduct.count);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const {isAuth, id} = useAppSelector(state => state.userReducer);

    const handleCount = async (count: number) => {
        if(!isAuth || id === undefined) return;
        if(count < 1) count = 1;
        if(count > 99) count = 99;
        if(count > value) {
            setIsLoading(true);
            await dispatch(addProductToCart(id, product.id, count-value));
            setValue(count);
            setIsLoading(false);
        }
        if(count < value) {
            setIsLoading(true);
            await dispatch(takeProductFromCart(id, product.id, value-count));
            setValue(count);
            setIsLoading(false);
        }
    }

    const handleDelete = () => {
        if(isAuth && id !== undefined)
            dispatch(removeProductFromCart(id, product.id));
    }

    return (
        <ProductItem
            $isLoading={isLoading}
            key={cartProduct.id}
        >
            <ProductItemImageWrapper>
                <ProductItemImage src={process.env.REACT_APP_URL+product.img} alt={product.name} />
            </ProductItemImageWrapper>
            <ProductItemInfo>
                <ProductItemNameLine>
                    <ProductItemName>{product.name}</ProductItemName>
                    <TrashCan
                        onClick={handleDelete}
                    />
                </ProductItemNameLine>
                <ProductItemWeight>{String(product.weight)} г</ProductItemWeight>
                <ProductItemPriceOptionsBlock>
                    <Counter
                        isMini={true}
                        value={value}
                        setValue={handleCount}
                    />
                    <ProductItemPrice>{product.price * value} ₽.</ProductItemPrice>
                </ProductItemPriceOptionsBlock>
            </ProductItemInfo>
        </ProductItem>
    );
};

export default CartButtonProductsListItem;