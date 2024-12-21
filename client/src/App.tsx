import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import Header from "./components/Header/Header";
import ModalController from "./components/Modal/ModalController";
import {check} from "./store/reducers/ActionCreators";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import {ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE} from "./types/consts";
import PageNotFound from "./pages/PageNotFound";
import styled from "styled-components";
import AdminRouter from "./pages/Admin/AdminRouter";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {getCookie} from "./utils/cookies";
import NotificationsList from "./components/Notifications/NotificationsList";
import CartPage from "./pages/CartPage";
import {useQuery} from "@apollo/client";
import {GET_ALL_CATEGORIES} from "./graphql/query/category";
import {ICategory} from "./types/Category";

const AppWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`

function App() {
    const dispatch = useAppDispatch();
    const {data:categoriesData, loading} = useQuery(GET_ALL_CATEGORIES);
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
        if(getCookie('token')) dispatch(check())
    }, []);

    useEffect(() => {
        if(!loading) {
            setCategories(categoriesData.getCategories);
        }
    }, categoriesData)

    return (
        <AppWrapper>
            <Header/>
            <title>Мой сайт</title>
            <Main>
                <Routes>
                    <Route path={`${ADMIN_ROUTE}/*`} element={<AdminRouter/>} />
                    <Route path={`${CART_ROUTE}/*`} element={<CartPage/>} />
                    <Route path={SHOP_ROUTE} index element={<MainPage/>} />
                    {categories.map(category => <Route key={category.id} path={`${SHOP_ROUTE}${category.slug}/*`} element={<MainPage/>} />)}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Main>
            <Footer />

            <ModalController />
            <NotificationsList />

        </AppWrapper>
    );
}

export default App;
