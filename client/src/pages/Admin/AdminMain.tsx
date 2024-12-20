import React from 'react';
import styled from "styled-components";
import {Container} from "../../components/Container";
import {BigButton, Button} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 240px;
    gap: 20px;
    
`

const Title = styled.h1`
    color: var(--color-text-primary);
    font-size: 40px;
    font-weight: var(--fw-bold);
    text-align: center;
`

const AdminMain = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Wrapper>
                <Title>Выберите раздел</Title>
                <BigButton
                    onClick={e => navigate('./categories')}
                >
                    Категории
                </BigButton>
                <BigButton
                    onClick={e => navigate('./products')}
                >
                    Продукты
                </BigButton>
            </Wrapper>
        </Container>
    );
};

export default AdminMain;