import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import {FilledButton} from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getCartProducts} from "../../store/reducers/ActionCreators";
import EmptyCartComponent from "../EmptyCartComponent/EmptyCartComponent";
import {FaCaretUp} from "react-icons/fa6";
import {fadeAnimation, showAnimation} from "../../utils/animations/modalAnimations";
import CartButtonProductsList from "./CartButtonProductsList/CartButtonProductsList";
import {useNavigate} from "react-router-dom";
import {CART_ROUTE} from "../../types/consts";
import {notificationSlice} from "../../store/reducers/notificationSlice";
import {NotificationType} from "../../types/INotification";

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover > div {
        animation: ${showAnimation} 0.3s linear;
        
    }
`

const HoverWindow = styled.div<{$isFade: boolean}>`
    position: absolute;
    content: '';
    padding-top: 20px;
    top: calc(100%);
    left: calc(100% - 354px);
    width: 354px;
    transition: opacity 0.3s linear;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    ${props => props.$isFade && css`
        opacity: 0;
        animation: ${fadeAnimation} 0.5s linear;
    `}
`

const HoverContent = styled.div`
    position: relative;
    width: 100%;
    min-height: 354px;
    background-color: var(--color-white);
    border-radius: 10px;
    filter: drop-shadow(0 1px 6px rgba(0,0,0,0.2))
`

const CaretUp = styled(FaCaretUp)`
    position: absolute;
    content: "";
    top: -18px;
    right: 30px;
    font-size: 38px;
    color: var(--color-white);
    z-index: 101;
`

const CartButton = () => {
    const {id, isAuth} = useAppSelector(state => state.userReducer)
    const {products, isLoading, error} = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);
    const fadeRef = useRef<null | NodeJS.Timeout>(null);
    const [isFade, setIsFade] = useState(false);
    const navigation = useNavigate();

    const handleMouseEnter = () => {
        if(fadeRef.current) {
            clearTimeout(fadeRef.current);
            fadeRef.current = null;
        }
        setIsFade(false);
        setIsActive(true)
    }

    const handleMouseLeave = () => {
        setIsFade(true);
        fadeRef.current = setTimeout(() => {
            setIsFade(false);
            setIsActive(false);
        }, 500);
    }

    const handleCartButtonClick = () => {
        if(isAuth && id !== undefined) {
            if(products.length === 0) {
                dispatch(notificationSlice.actions.addNotification({
                    id: Date.now(),
                    type: NotificationType.WARNING,
                    duration: 3000,
                    message: "У вас пустая корзина"
                }));
                return;
            }
            navigation(CART_ROUTE);
        } else {
            dispatch(notificationSlice.actions.addNotification({
                id: Date.now(),
                type: NotificationType.WARNING,
                duration: 3000,
                message: "Вы не авторизованы"
            }))
        }
    }
    useEffect(() => {
        if(isAuth && id !== undefined) {
            dispatch(getCartProducts(id));
        }
    }, [isAuth]);

    return (
        <Wrapper
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <FilledButton
                onClick={handleCartButtonClick}
            >
                {products.length > 0 ? `Корзина (${products.length})` : "Корзина"}
            </FilledButton>
            {isActive && <HoverWindow $isFade={isFade}>
                <HoverContent>
                    {products.length > 0
                        ?
                        <CartButtonProductsList />
                        :
                        <EmptyCartComponent />
                    }
                    <CaretUp/>
                </HoverContent>
            </HoverWindow>}
        </Wrapper>
    );
};

export default CartButton;