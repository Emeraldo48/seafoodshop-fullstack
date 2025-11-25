import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FC} from "react";
import ConfirmModal from "../../components/Modal/ConfirmModal";

export interface ModalState {
  Component?: FC
  data?: any
}

export interface ConfirmModalData {
  onAccept: () => void;
  onDecline: () => void;
}

const initialState: ModalState = {
  //window: ModalWindows.NONE
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalWindow(state, action: PayloadAction<ModalState>) {
      state.data = action.payload.data;
      state.Component = action.payload.Component;
    },
    setConfirmWindow(state, action: PayloadAction<ConfirmModalData>) {
      state.Component = ConfirmModal;
      state.data = action.payload;
    },
    clearModalWindow(state) {
      state.data = undefined;
      state.Component = undefined;
    }
  }
})

export default modalSlice.reducer;