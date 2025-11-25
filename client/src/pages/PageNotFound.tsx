import React from 'react';
import styled from "styled-components";
import {BigButton} from "../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../types/consts";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`

const Title = styled.h1`
    font-size: 30px;
    color: var(--color-text-primary);
`


const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>Страница не найдена</Title>
      <BigButton
        onClick={e => navigate(SHOP_ROUTE)}
      >
        Вернуться на главную
      </BigButton>
    </Wrapper>
  );
};

export default PageNotFound;