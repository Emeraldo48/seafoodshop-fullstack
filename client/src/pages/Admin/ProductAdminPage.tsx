import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useQuery} from "@apollo/client";
import {Button, FilledButton} from "../../components/Button/Button";
import {useAppDispatch} from "../../hooks/redux";
import {modalSlice} from "../../store/reducers/modalSlice";
import {GET_ALL_PRODUCTS} from "../../graphql/query/product";
import AddProductModal from "../../components/Modal/Admin/AddProductModal";
import {useNavigate} from "react-router-dom";
import {IProduct} from "../../types/Product";
import {removeProduct} from "../../http/productAPI";
import ChangeProductModal from "../../components/Modal/Admin/ChangeProductModal";
import {GET_ALL_CATEGORIES} from "../../graphql/query/category";
import {ICategory} from "../../types/Category";
import Pagination from "../../components/Pagination/Pagination";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 240px 30px;
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
    height: 60px;
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

const productsOnPage = 5;
const ProductAdminPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Record<string, ICategory>>({});
  const [page, setPage] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const {data, loading, error, refetch} = useQuery(GET_ALL_PRODUCTS);
  const {data: categoriesData, loading: categoriesLoading, error: categoriesError} = useQuery(GET_ALL_CATEGORIES);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !categoriesLoading) {
      setProducts(data.getProducts.products);
      setCategories(categoriesData.getCategories.reduce((acc: Record<string, ICategory>, value: ICategory) => {
        return {...acc, [value.id]: value};
      }, {}));
    }
  }, [data, categoriesData]);

  useEffect(() => {
    if (!loading && !categoriesLoading) {
      setFilteredProducts(products.slice(page * productsOnPage, (page + 1) * productsOnPage));
    }
  }, [page, products]);

  const addHandler = () => {
    dispatch(modalSlice.actions.setModalWindow({
      Component: AddProductModal,
      data: {
        onAdd() {
          refetch().then();
        }
      }
    }));
  }

  const updateHandler = (product: IProduct) => {
    dispatch(modalSlice.actions.setModalWindow({
      Component: ChangeProductModal,
      data: {
        product,
        onAdd() {
          refetch().then();
        }
      }
    }));
  }

  const deleteHandler = (id: number) => {
    dispatch(modalSlice.actions.setConfirmWindow({
      onAccept() {
        removeProduct(id).then(res => {
          refetch().then();
        })
      },
      onDecline() {

      }
    }));
  }


  return (
    <Wrapper>
      <BackButton onClick={e => navigate('..')}>Назад</BackButton>
      <Title>Продукты</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableNameCell>Номер</TableNameCell>
            <TableNameCell>Имя Продукта</TableNameCell>
            <TableNameCell>Цена</TableNameCell>
            <TableNameCell>Категория</TableNameCell>
            <TableNameCell>Вес</TableNameCell>
            <TableNameCell>Доступно</TableNameCell>
            <TableNameCell>
              <TableActionsHandler>
                <Button onClick={addHandler}>Добавить</Button>
              </TableActionsHandler>
            </TableNameCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map(product =>
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{categories[product.categoryId]?.name || "Не существует"}</TableCell>
              <TableCell>{String(product.weight)}</TableCell>
              <TableCell>{product.isAvailable}</TableCell>
              <TableCell>
                <TableActionsHandler>
                  <FilledButton
                    onClick={e => updateHandler(product)}
                  >
                    Изменить
                  </FilledButton>
                  <FilledButton
                    onClick={e => deleteHandler(product.id)}
                  >
                    Удалить
                  </FilledButton>
                </TableActionsHandler>

              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {products.length > 0 && <Pagination
        page={page}
        onSetPage={(page: number) => setPage(page)}
        elementsCount={products.length}
        elementsPerPage={productsOnPage}
      />}

    </Wrapper>
  );
};

export default ProductAdminPage;