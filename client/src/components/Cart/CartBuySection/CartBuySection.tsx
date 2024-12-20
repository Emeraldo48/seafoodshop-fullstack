import React, {FC} from 'react';
import styled from "styled-components";
import {BigButton, FilledButton} from "../../Button/Button";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../../types/consts";

const Wrapper = styled.section`
    
`

const CostBlock = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 155px;
    justify-items: end;
    align-items: baseline;
`

const CostTitle = styled.h4`
    color: var(--color-text-primary);
    font-size: 22px;
`

const CostValue = styled.p`
    color: var(--color-text-primary);
    text-align: end;
    font-weight: var(--fw-bold);
    font-size: 26px;
`

const Options = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
`

const BackButton = styled(BigButton)`
    background-color: var(--color-text-secondary);
    color: var(--color-white);
    border: 1px solid var(--color-text-secondary);
`

interface CartBuySectionProps {
    sum: number
    handleBuy: () => void
}

const CartBuySection: FC<CartBuySectionProps> = ({sum, handleBuy}) => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <CostBlock>
                <span></span>
                <CostTitle>Сумма заказа:</CostTitle>
                <CostValue>{sum} ₽</CostValue>
            </CostBlock>
            <Options>
                <BackButton onClick={e => navigate(SHOP_ROUTE)}>Вернуться в меню</BackButton>
                <BigButton onClick={handleBuy}>Оформить заказ</BigButton>
            </Options>

        </Wrapper>
    );
};

export default CartBuySection;