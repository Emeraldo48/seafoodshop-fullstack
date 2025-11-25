import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/User";
import {removeCookie} from "../../utils/cookies";
import {cartSlice} from "./cartSlice";


interface UserState {
  id?: number
  email?: string
  role?: string
  isAuth: boolean
  error: string
  isLoading: boolean
}

const initialState: UserState = {
  isAuth: false,
  error: '',
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginStart(state) {
      state.isAuth = false;
      state.isLoading = true;
    },
    userLoginSuccess(state, action: PayloadAction<IUser>) {
      state.error = '';
      state.isLoading = false;
      state.isAuth = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    userLoginError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.isAuth = false;
    },
    userLogout(state) {
      state.error = "";
      state.isLoading = false;
      state.isAuth = false;
      state.id = undefined;
      state.email = undefined;
      state.role = undefined;
      removeCookie('token');
    },
    clearError(state) {
      state.error = "";
    }

  }

})

export default userSlice.reducer;