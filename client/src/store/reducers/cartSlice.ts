import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartProduct} from "../../types/ICartProduct";

interface CartState {
    products: ICartProduct[],
    totalCost: number,
    isLoading: boolean,
    error: string,
}

const initialState: CartState = {
    products: [],
    totalCost: 0,
    isLoading: false,
    error: '',
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        cartLoadingStart(state) {
            state.isLoading = true;
            state.error = '';
        },
        cartLoadingSuccess(state, action: PayloadAction<ICartProduct[]>) {
            state.products = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        cartClearSuccess(state) {
            state.products = [];
            state.isLoading = false;
            state.error = '';
        },
        cartLoadingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default cartSlice.reducer;