import {Navigate, Route, Routes} from "react-router-dom";
import AdminMain from "./AdminMain";
import {useAppSelector} from "../../hooks/redux";
import CategoryAdminPage from "./CategoryAdminPage";
import ProductAdminPage from "./ProductAdminPage";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const AdminRouter = () => {
    useDocumentTitle('Панель администратора | ' + process.env.REACT_APP_NAME);

    const {role} = useAppSelector(state => state.userReducer);


    if(role !== "ADMIN") return <Navigate to={'/'} />

    return (
        <Routes>
            <Route path={'/categories'} element={<CategoryAdminPage />} />
            <Route path={'/products'} element={<ProductAdminPage />} />
            <Route index element={<AdminMain />} />
        </Routes>
    );
};

export default AdminRouter;