import {AppDispatch} from "../store";
import {IUser} from "../../types/User";
import {userSlice} from "./userSlice";
import {jwtDecode} from "jwt-decode";
import {getErrorMessage} from "../../utils";
import {$authHost, $host} from "../../http";
import {setCookie} from "../../utils/cookies";
import {cartSlice} from "./cartSlice";
import {ICartProduct} from "../../types/ICartProduct";
import {productSlice} from "./productSlice";
import {notificationSlice} from "./notificationSlice";
import {NotificationType} from "../../types/INotification";


export const tryToLogin = (email: String, password: String) => async (dispatch: AppDispatch)=> {
    try {
        dispatch(userSlice.actions.userLoginStart());
        const {data} = await $host.post('users/login', {email, password});
        const decode: IUser = jwtDecode(data.token);
        setCookie('token', data.token);
        dispatch(userSlice.actions.userLoginSuccess(decode));
    } catch (e) {
        dispatch(userSlice.actions.userLoginError(getErrorMessage(e)));
        dispatch(notificationSlice.actions.addNotification({id: Date.now(), type: NotificationType.ERROR, duration: 3000, message: "Ошибка авторизации", count: 1}))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userLogout());
        dispatch(cartSlice.actions.cartClearSuccess());
    } catch (e) {
        dispatch(userSlice.actions.userLoginError(getErrorMessage(e)));
    }
}
export const registration = (email: String, password: String) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userLoginStart());
        const {data} = await $host.post('users/registration', {email, password});
        const decode: IUser = jwtDecode(data.token);
        setCookie('token', data.token);
        dispatch(userSlice.actions.userLoginSuccess(decode));
    } catch (e) {
        dispatch(userSlice.actions.userLoginError(getErrorMessage(e)));
        dispatch(notificationSlice.actions.addNotification({id: Date.now(), type: NotificationType.ERROR, duration: 3000, message: "Ошибка регистрации", count: 1}))
    }
}

export const check = () => async (dispatch: AppDispatch) => {
    try {
        const {data} = await $authHost.get('users/auth');
        const decode: IUser = jwtDecode(data.token);
        setCookie('token', data.token);
        dispatch(userSlice.actions.userLoginSuccess(decode));
    } catch (e) {
        dispatch(userSlice.actions.userLoginError(getErrorMessage(e)));
    }
}

export const getCartProducts = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cartSlice.actions.cartLoadingStart());
        const {data} = await $authHost.get<ICartProduct[]>(`/carts/${userId}`);
        dispatch(cartSlice.actions.cartLoadingSuccess(data));
    } catch (e) {
        dispatch(cartSlice.actions.cartLoadingError(getErrorMessage(e)))
    }
}

export const addProductToCart = (userId: number, productId: number, count: number = 1) => async (dispatch: AppDispatch) => {
    try {
        const {data} = await $authHost.post<ICartProduct[]>(`/carts`, {userId, productId, count});
        dispatch(cartSlice.actions.cartLoadingSuccess(data));
    } catch (e) {
        dispatch(cartSlice.actions.cartLoadingError(getErrorMessage(e)))
    }
}

export const takeProductFromCart = (userId: number, productId: number, count: number = 1) => async (dispatch: AppDispatch) => {
    try {
        const {data} = await $authHost.patch<ICartProduct[]>(`/carts`, {userId, productId, count});
        dispatch(cartSlice.actions.cartLoadingSuccess(data));
    } catch (e) {
        dispatch(cartSlice.actions.cartLoadingError(getErrorMessage(e)))
    }
}

export const removeProductFromCart = (userId: number, productId: number) => async (dispatch: AppDispatch) => {
    try {
        const {data} = await $authHost.delete<ICartProduct[]>(`/carts/${userId}/${productId}`);
        dispatch(cartSlice.actions.cartLoadingSuccess(data));
        dispatch(notificationSlice.actions.addNotification({
            id: Date.now(),
            type: NotificationType.INFO,
            duration: 3000,
            message: "Продукт удалён из корзины",
            count: 1
        }));
    } catch (e) {
        dispatch(cartSlice.actions.cartLoadingError(getErrorMessage(e)))
    }
}

export const clearCart = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cartSlice.actions.cartLoadingStart());
        const {data} = await $authHost.delete<ICartProduct[]>(`/carts/${userId}`);
        dispatch(cartSlice.actions.cartClearSuccess());
    } catch (e) {
        dispatch(cartSlice.actions.cartLoadingError(getErrorMessage(e)))
    }
}
export const loadAllProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.productsSetStart());
        const {data} = await $authHost.get<ICartProduct[]>(`/products/`);
        dispatch(productSlice.actions.productsSetSuccess(data.reduce((acc, value) => ({...acc, [value.id]: value}), {})));
    } catch (e) {
        dispatch(productSlice.actions.productsSetError(getErrorMessage(e)))
    }
}