import React, {FC} from 'react';
import styled from "styled-components";
import {ICartProduct} from "../../../types/ICartProduct";
import {IProduct} from "../../../types/Product";
import Counter from "../../Counter/Counter";
import {FaTrashCan} from "react-icons/fa6";

const Wrapper = styled.article`
    padding: 20px 0;
    border-bottom: 1px solid var(--color-text-secondary);
    display: grid;
    grid-template-columns: 354px 1fr 20px;
    grid-gap: 20px;
    
    &:first-child {
        border-top: 1px solid var(--color-text-primary);
    }
`

const InfoBlock = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 10px;
`

const Image = styled.img`
    width: 60px;
    height: 60px;
`

const NameWeightBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    align-items: flex-start;
`

const Name = styled.h3`
    font-size: var(--font-size-md);
    color: var(--color-text-primary);
`

const Weight = styled.p`
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);

`

const CountCostBlock = styled.div`
    display: flex;
    align-items: center;
`

const Price = styled.span`
    margin-left: 40px;
    font-weight: var(--fw-bold);
`

const TrashCan = styled(FaTrashCan)`
    align-self: center;
    color: var(--color-text-secondary);
    cursor: pointer;
`

interface CartProductsListItemProps {
  cartProduct: ICartProduct
  product: IProduct
  setCount: (count: number) => void
  handleDelete: () => void
}

const CartProductsListItem: FC<CartProductsListItemProps> = ({cartProduct, product, setCount, handleDelete}) => {

  return (
    <Wrapper>
      <InfoBlock>
        <Image src={process.env.REACT_APP_URL + product.img} alt={product.name}/>
        <NameWeightBlock>
          <Name>{product.name}</Name>
          <Weight>{String(product.weight)} г.</Weight>
        </NameWeightBlock>

      </InfoBlock>
      <CountCostBlock>
        <Counter value={cartProduct.count} setValue={setCount}/>
        <Price>{product.price * cartProduct.count} ₽</Price>
      </CountCostBlock>
      <TrashCan
        onClick={handleDelete}
      />
    </Wrapper>
  );
};

export default CartProductsListItem;