import React, {FC, ReactElement, ReactNode, useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import {FaXmark} from "react-icons/fa6";
import {
    fadeAnimation,
    fadeContentAnimation,
    showAnimation,
    showContentAnimation
} from "../../utils/animations/modalAnimations";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {modalSlice, ModalState} from "../../store/reducers/modalSlice";

const Layout = styled.div<{
    $fading: boolean
}>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
    animation: ${showAnimation} 0.5s linear;
    overflow: scroll;
    ${props => props.$fading && css`
        animation: ${fadeAnimation} 0.2s linear;
        opacity: 0;
    `}
    
    &::-webkit-scrollbar {
        display: none;
    }
    z-index: calc(Infinity);
`

const ContentWrapper = styled.div<{
    $fading: boolean
}>`
    position: relative;
    padding: 40px;
    background-color: var(--color-white);
    border-radius: 20px;
    animation: ${showContentAnimation} 0.2s linear;
    margin: auto 0;

    ${props => props.$fading && css`
        animation: ${fadeContentAnimation} 0.2s linear;
        opacity: 0;
        transform: scale(0.8);
    `}
`

const CancelButton = styled(FaXmark)`
    position: absolute;
    font-size: 40px;
    color: var(--color-white);
    top: 17px;
    right: -48px;
    opacity: 0.8;
    transition: all 0.2s linear;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.2);
        opacity: 1;
    }
`

interface ModalInterface {
    children: ReactNode
}

const Modal: FC<ModalInterface> = ({children}) => {
    const [fading, setFading] = useState(false);
    const dispatch = useAppDispatch();
    const layoutRef = useRef<boolean>(false);
    const {data}: ModalState = useAppSelector(state => state.modalReducer);

    useEffect(() => {

        document.body.setAttribute("data-modal-open", "true");

        return () => {
            document.body.removeAttribute("data-modal-open");
        }
    }, []);

    const handleLayoutMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        layoutRef.current = true;
    }

    const handleMouseUp = (isLayout: boolean)=> {
        if(isLayout && layoutRef.current) {
            onHideClick();
        }
        layoutRef.current = false;
    }

    const onHideClick = () => {
        setFading(true);
        setTimeout(() => {
            dispatch(modalSlice.actions.clearModalWindow());
            setFading(false);
            if(data.onClose) data.onClose();
        }, 200);
    }

    return (
        <Layout
            $fading={fading}
            onMouseDown={e => handleLayoutMouseDown(e)}
            onMouseUp={e => handleMouseUp(true)}
        >
            <ContentWrapper
                $fading={fading}
                onMouseUp={e => {e.stopPropagation(); handleMouseUp(false)}}
                onMouseDown={e => e.stopPropagation()}
            >
                <CancelButton
                    onClick={e => onHideClick()}
                />
                {children}
            </ContentWrapper>
        </Layout>
    );
};

export default Modal


