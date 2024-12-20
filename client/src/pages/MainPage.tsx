import React from 'react';
import Shop from "../components/Shop/Shop";
import useDocumentTitle from "../hooks/useDocumentTitle";

const MainPage = () => {
    useDocumentTitle('Главная | ' + process.env.REACT_APP_NAME);
    return (
        <>
            <Shop />
        </>
    );
};

export default MainPage;