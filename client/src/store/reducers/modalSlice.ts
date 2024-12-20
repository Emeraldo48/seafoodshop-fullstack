import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FC, ReactNode} from "react";
import ConfirmModal from "../../components/Modal/ConfirmModal";

/*export enum ModalWindows {
    NONE,
    AUTH,
    CONFIRM,
}*/

export interface ModalState {
    //window: ModalWindows
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
            //state.window = action.payload.window;
            state.data = action.payload.data;
            state.Component = action.payload.Component;
        },
        setConfirmWindow(state, action: PayloadAction<ConfirmModalData>) {
            //state.window = ModalWindows.CONFIRM;
            state.Component = ConfirmModal;
            state.data = action.payload;
        },
        clearModalWindow(state) {
            //state.window = ModalWindows.NONE
            state.data = undefined;
            state.Component = undefined;
        }
    }
})

export default modalSlice.reducer;