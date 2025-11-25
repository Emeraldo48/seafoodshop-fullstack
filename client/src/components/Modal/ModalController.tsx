import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {ModalState} from "../../store/reducers/modalSlice";
import Modal from "./Modal";

const ModalController = () => {
    const {Component}: ModalState = useAppSelector(state => state.modalReducer);

    if(!Component) return <></>

    return (
        <Modal>
            <Component />
        </Modal>
    );
};

export default ModalController;