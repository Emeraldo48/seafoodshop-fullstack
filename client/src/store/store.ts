import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import modalReducer from "./reducers/modalSlice";
import cartReducer from "./reducers/cartSlice";
import productReducer from "./reducers/productSlice";
import notificationReducer from "./reducers/notificationSlice";


const rootReducer = combineReducers({
    userReducer,
    modalReducer,
    cartReducer,
    productReducer,
    notificationReducer,

});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => (
            getDefaultMiddleware({
                serializableCheck: false
            })
        )

    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];