import {IProduct} from "../../types/Product";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface ProductState {
  products: Record<string | number, IProduct>
  isLoading: boolean
  error: string
}


const initialState: ProductState = {
  products: {},
  isLoading: false,
  error: ''
}

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    productsSetStart(state) {
      state.isLoading = true;
      state.error = '';
    },
    productsSetError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    productsSetSuccess(state, action: PayloadAction<Record<string, IProduct>>) {
      state.products = action.payload;
      state.isLoading = false;
    }
  }
})

export default productSlice.reducer;