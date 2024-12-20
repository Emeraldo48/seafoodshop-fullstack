import React, {useState} from 'react';
import styled from "styled-components";
import {TextInput} from "../../Input/Input";
import {BigButton} from "../../Button/Button";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {modalSlice} from "../../../store/reducers/modalSlice";
import {createCategory} from "../../../http/categoryAPI";
import {getErrorMessage} from "../../../utils";

const Form = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
    align-items: center;
`

const Title = styled.h3`
    font-size: var(--font-size-bg);
    color: var(--color-text-primary);
`

const ErrorMessage = styled.p`
    color: var(--color-red);
    text-align: center;
    font-size: var(--font-size-md);
    margin-top: 10px;
`

const AddCategoryModal = () => {
    const [name, setName] = useState('');
    const {data} = useAppSelector(state => state.modalReducer);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();


    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleButton = (e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        if(!name) {
            setError('Поле не должно быть пустым');
            return;
        }
        createCategory(name).then(res => {
            dispatch(modalSlice.actions.clearModalWindow());
            if(data && data.onAdd) data.onAdd();
        }).catch(e => {
            setError(getErrorMessage(e));
        });

    }

    return (
        <Form>
            <Title>Добавить категорию</Title>
            <TextInput
                onChange={handleName}
                value={name}
                placeholder="Введите название категории"
                required
            />
            <BigButton onClick={handleButton}>Отправить</BigButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
    );
};

export default AddCategoryModal;