import React, {FC, memo} from 'react';
import styled from "styled-components";
import {IProduct} from "../../types/Product";
import {Button} from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addProductToCart, takeProductFromCart} from "../../store/reducers/ActionCreators";
import {ICartProduct} from "../../types/ICartProduct";
import Counter from "../Counter/Counter";

const Wrapper = styled.article`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
`

const Image = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 10px;
`

const NameAndWeightLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    
    & h3 {
        font-size: 20px;
        color: var(--color-text-primary);
    }
    
    & p {
        font-size: 16px;
        color: var(--color-text-secondary);
        text-wrap: nowrap;
        margin-top: 3px;
        margin-bottom: auto;
    }
`

const Description = styled.p`
    font-size: 16px;
    color: var(--color-text-secondary);
    overflow: hidden;
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
`

const BuyLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    height: 42px;
`

const Cost = styled.p`
    font-size: 20px;
    color: var(--color-text-primary);
    text-wrap: nowrap;
`

const CartButton = styled(Button)`
    height: 40px;
    padding: 0 20px;
`


interface ProductsItemProps {
  card: IProduct
  handleProductClick: (product: IProduct) => void
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => void
  cartProduct?: ICartProduct
}

const ProductsItem: FC<ProductsItemProps> = memo(({card, handleProductClick, handleButtonClick, cartProduct}) => {

  const dispatch = useAppDispatch();
  const {isAuth, id} = useAppSelector(state => state.userReducer);

  const handleCounterChange = (count: number) => {
    if (!cartProduct || !isAuth || id === undefined) return;
    if (count > 99) count = 99;
    if (count > cartProduct.count) {
      dispatch(addProductToCart(id, card.id, count - cartProduct.count));
    }
    if (count < cartProduct.count) {
      dispatch(takeProductFromCart(id, card.id, count - cartProduct.count));
    }
  }

  return (
    <Wrapper
      onClick={(e) => handleProductClick(card)}
    >
      <Image src={`${process.env.REACT_APP_URL}${card.img}`} alt={card.name}/>
      <NameAndWeightLine>
        <h3>{card.name}</h3>
        <p>{card.price} г.</p>
      </NameAndWeightLine>
      <Description>{card.description}</Description>
      <BuyLine>
        <Cost>{card.price} ₽ </Cost>
        {cartProduct
          ?
          <Counter value={cartProduct.count} setValue={handleCounterChange} canBeZero={true}/>
          :
          <CartButton
            onClick={e => handleButtonClick(e, card)}
          >
            В корзину
          </CartButton>
        }

      </BuyLine>
    </Wrapper>
  );
}, areEqual);

function areEqual(prevProps: ProductsItemProps, nextProps: ProductsItemProps) {
  return prevProps.cartProduct?.count === nextProps.cartProduct?.count;
}

export default ProductsItem;