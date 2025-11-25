import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {modalSlice} from "../../../store/reducers/modalSlice";
import {FileInput, NumberInput, TextArea, TextInput} from "../../Input/Input";
import {BigButton} from "../../Button/Button";
import {useQuery} from "@apollo/client";
import {GET_ALL_CATEGORIES} from "../../../graphql/query/category";
import {ICategory} from "../../../types/Category";
import CustomSelect from "../../Select/CustomSelect";
import {updateProduct} from "../../../http/productAPI";

const Form = styled.form`
    width: 500px;
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

const Label = styled.label`
    font-weight: var(--fw-bold);
    width: 100%;

    & p {
        margin-bottom: 5px;
    }
`

const ErrorMessage = styled.p`
    color: var(--color-red);
    text-align: center;
    font-size: var(--font-size-md);
    margin-top: 10px;
`
interface CategoryOption {
    value: number
    label: string
}

const ChangeProductModal = () => {
    const {data:{product, onAdd}} = useAppSelector(state => state.modalReducer);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [error, setError] = useState('');
    const [category, setCategory] = useState<CategoryOption | null>(null);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [description, setDescription] = useState(product.description);
    const [weight, setWeight] = useState(product.weight);
    const [file, setFile] = useState<File | null>(null);

    const {data: categoriesData, loading} = useQuery(GET_ALL_CATEGORIES);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!loading) {
            const categoryOptions: CategoryOption[] = categoriesData.getCategories.map((category: ICategory) => (
                {value: category.id, label: category.name})
            );
            setCategories(categoryOptions);
            const chosenCategory = categoryOptions.find(category => category.value == product.categoryId) || null;
            setCategory(chosenCategory);
        }
    }, [categoriesData]);

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value[0] === "0") e.target.value = value.slice(1);

        setPrice(Number(e.target.value));
    }

    const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value[0] === "0") e.target.value = value.slice(1);

        setWeight(Number(e.target.value));
    }

    const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!name || !price || !weight || !category || !description) {
            setError('Не все поля заполнены');
            return;
        }

        const formData = new FormData();
        formData.append("id",product.id);
        if(product.name !== name) formData.append('name', name);
        if(product.price !== price) formData.append('price', String(price));
        if(product.weight !== weight) formData.append('weight', String(weight));
        if(product.categoryId !== category?.value) formData.append('categoryId', String(category?.value || 0));
        if(product.description !== description) formData.append('description', description);
        if (file) formData.append('img', file);

        console.log(product.name, name);
        console.log(formData.get(name));
        updateProduct(formData).then(res => {
            dispatch(modalSlice.actions.clearModalWindow());
            if (onAdd) onAdd();
        });

        /*createCategory(name).then(res => {
            dispatch(modalSlice.actions.clearModalWindow());
            if (data && data.onAdd) data.onAdd();
        }).catch(e => {
            setError(getErrorMessage(e));
        });*/

    }

    return (
        <Form>
            <Title>Изменить продукт</Title>
            <Label>
                <p>Название продукта</p>
                <TextInput
                    onChange={handleName}
                    value={name}
                    placeholder="Введите название продукта"
                    required
                />

            </Label>

            <Label>
                <p>Цена</p>
                <NumberInput
                    onChange={handlePrice}
                    value={price}
                    placeholder="Цена"
                    required
                />
            </Label>

            <Label>
                Вес
                <NumberInput
                    onChange={handleWeight}
                    value={weight}
                    placeholder="Вес"
                    required
                />
            </Label>

            <Label>
                <p>Категория</p>
                <CustomSelect
                    options={categories}
                    onChange={option => setCategory(option)}
                    value={category}
                />
            </Label>

            <Label>
                Описание
                <TextArea
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    placeholder="Описание"
                />
            </Label>

            <Label>
                Изображение
                <FileInput
                    onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                    data-text={(file)?"Файл загружен":"Выберите файл"}
                    accept="image/png, image/jpeg, image/webp"
                />
            </Label>

            <BigButton onClick={handleButton}>Изменить</BigButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
    );
};

export default ChangeProductModal;