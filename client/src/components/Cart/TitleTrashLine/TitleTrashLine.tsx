import React, {FC} from 'react';
import styled from "styled-components";
import {FaTrash} from 'react-icons/fa6';

const Wrapper = styled.h1`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 36px;
    color: var(--color-text-primary);
    margin-bottom: 40px;
`


const Trash = styled(FaTrash)`
    color: var(--color-red);
    font-size: 20px;
    cursor: pointer;
`

interface handleClearCart {
    handleClearCart: () => void
}

const TitleTrashLine: FC<handleClearCart> = ({handleClearCart}) => {
    return (
        <Wrapper>
            Корзина
            <Trash
                onClick={handleClearCart}
            />
        </Wrapper>
    );
};

export default TitleTrashLine;