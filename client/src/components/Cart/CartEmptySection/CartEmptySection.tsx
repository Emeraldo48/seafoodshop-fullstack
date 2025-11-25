import React from 'react';
import styled from "styled-components";
import {BigButton} from "../../Button/Button";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../../types/consts";

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 40px;
    height: 400px;
`
const Title = styled.h2`
    font-size: 40px;
    color: var(--color-text-primary);
`

const CartEmptySection = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>Корзина пуста</Title>
      <BigButton
        onClick={e => navigate(SHOP_ROUTE)}
      >
        Вернуться назад
      </BigButton>

    </Wrapper>
  );
};

export default CartEmptySection;