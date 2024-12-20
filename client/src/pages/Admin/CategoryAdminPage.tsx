import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_CATEGORIES} from "../../graphql/query/category";
import {ICategory} from "../../types/Category";
import {Button, FilledButton} from "../../components/Button/Button";
import {useAppDispatch} from "../../hooks/redux";
import {modalSlice} from "../../store/reducers/modalSlice";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import AddCategoryModal from "../../components/Modal/Admin/AddCategoryModal";
import {REMOVE_CATEGORY} from "../../graphql/mutation/category";
import {removeCategory} from "../../http/categoryAPI";
import {useNavigate} from "react-router-dom";
import ChangeCategoryModal from "../../components/Modal/Admin/ChangeCategoryModal";

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

const Table = styled.table`
    border-collapse: collapse;
    font-size: var(--font-size-md)
`

const TableHeader = styled.thead`
    background-color: bisque;
    border: 1px solid var(--color-red);
    
`

const TableRow = styled.tr`
    
    &:not(&:last-child) {
        border-bottom: 1px solid var(--color-red);
    }
`

const TableNameCell = styled.th`
    padding: 10px;
    
`

const TableBody = styled.tbody`
    
`

const TableCell = styled.td`
    padding: 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    
`

const TableActionsHandler = styled.div`
    display: flex;
    column-gap: 10px;
    justify-content: flex-end;
`

const BackButton = styled(Button)`
    width: 140px;
`



const CategoryAdminPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const {data, loading, error, refetch} = useQuery(GET_ALL_CATEGORIES);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const addHandler = () => {
        dispatch(modalSlice.actions.setModalWindow({
            Component: AddCategoryModal,
            data: {
                onAdd() {
                    refetch().then();
                }
            }
        }));
    }

    const updateHandler = (category: ICategory) => {
        dispatch(modalSlice.actions.setModalWindow({
            Component: ChangeCategoryModal,
            data: {
                category,
                onAdd() {
                    refetch().then();
                }
            }
        }));
    }

    const deleteHandler = (id: number) => {
        dispatch(modalSlice.actions.setConfirmWindow({
            onAccept() {
                removeCategory(id).then(res => {
                    refetch().then();
                })
            },
            onDecline() {

            }
        }));
    }

    useEffect(() => {
        if(!loading) {
            setCategories(data.getCategories);
        }
    }, [data]);

    return (
        <Wrapper>
            <BackButton onClick={e => navigate('..')}>Назад</BackButton>
            <Title>Категории</Title>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableNameCell>Номер</TableNameCell>
                        <TableNameCell>Имя категории</TableNameCell>
                        <TableNameCell>
                            <TableActionsHandler>
                                <Button onClick={addHandler}>Добавить</Button>
                            </TableActionsHandler>
                        </TableNameCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map(category =>
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                <TableActionsHandler>
                                    <FilledButton
                                        onClick={e => updateHandler(category)}
                                    >
                                        Изменить</FilledButton>
                                    <FilledButton
                                        onClick={e => deleteHandler(category.id)}
                                    >
                                        Удалить
                                    </FilledButton>
                                </TableActionsHandler>

                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Wrapper>
    );
};

export default CategoryAdminPage;