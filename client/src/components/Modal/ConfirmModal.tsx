import React, {FC} from 'react';
import styled from "styled-components";
import {BigButton, Button, FilledButton} from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {ConfirmModalData, modalSlice} from "../../store/reducers/modalSlice";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 340px;
    
`

const Title = styled.h3`
    font-size: var(--font-size-bg);
    color: var(--color-text-primary);
    margin-bottom: 20px;
`

const OptionsWrapper = styled.div`
    display: flex;
    column-gap: 20px;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`

const AnswerButton = styled(FilledButton)`
    flex: 1;
    height: 40px;
`

const DeclineButton = styled(AnswerButton)`
    background-color: transparent;
    color: var(--color-red);
`



const ConfirmModal: FC = () => {
    const {onAccept, onDecline}: ConfirmModalData = useAppSelector(state => state.modalReducer.data);
    const dispatch = useAppDispatch();

    const handleAccept = () => {
        onAccept();
        dispatch(modalSlice.actions.clearModalWindow());
    }

    const handlerDecline = () => {
        onDecline();
        dispatch(modalSlice.actions.clearModalWindow());
    }

    return (
        <Wrapper>
            <Title>Вы уверены?</Title>
            <OptionsWrapper>
                <AnswerButton onClick={handleAccept}>Да</AnswerButton>
                <DeclineButton onClick={handlerDecline}>Нет</DeclineButton>
            </OptionsWrapper>
        </Wrapper>
    );
};

export default ConfirmModal;