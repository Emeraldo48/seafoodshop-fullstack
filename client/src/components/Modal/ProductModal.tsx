import React, {FC, useState} from 'react';
import {IProduct} from "../../types/Product";
import styled from "styled-components";
import {BigButton} from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Counter from "../Counter/Counter";
import {addProductToCart} from "../../store/reducers/ActionCreators";
import {modalSlice} from "../../store/reducers/modalSlice";
import {notificationSlice} from "../../store/reducers/notificationSlice";
import {NotificationType} from "../../types/INotification";

const Wrapper = styled.div`
    display: flex;
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 15px;
`

const Image = styled.img`
    width: 290px;
    height: 290px;
    border-radius: 10px;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 25px;
`

const InfoBlock = styled.div`
    padding: 0 22px 0 30px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const InfoTitle = styled.h2`
    font-size: var(--font-size-bg);
    color: var(--color-text-primary);
    font-weight: var(--fw-bold);
`

const InfoWeight = styled.p`
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
`

const InfoDescription = styled.p`
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    width: 290px;
`

const BuyBlock = styled.div`
    padding: 12px 30px 0;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const BuyPrice = styled.p`
    font-size: var(--font-size-md);
    font-weight: var(--fw-bold);
    text-align: end;
`

const BuyOptions = styled.div`
    display: flex;
    column-gap: 10px;
    justify-content: space-between;
`

const BuyButton = styled(BigButton)`
    flex: 4;
`

const ProductModal: FC = () => {
    const {isAuth, id} = useAppSelector(state => state.userReducer);
    const {product} = useAppSelector(state => state.modalReducer.data);
    const [count, setCount] = useState<number>(1);
    const dispatch = useAppDispatch();

    const handleCount = (value: number) => {
        if(value < 1) value = 1;
        if(value > 99) value = 99;
        setCount(value);
    }

    const handleBuy = () => {
        if(isAuth && id !== undefined) {
            dispatch(addProductToCart(id, product.id, count));
            dispatch(modalSlice.actions.clearModalWindow());
        } else {
            dispatch(notificationSlice.actions.addNotification({
                id: Date.now(),
                type: NotificationType.WARNING,
                duration: 3000,
                message: "Вы не авторизованы"
            }))
        }
    }

    return (
        <Wrapper>
            <ImageWrapper>
                <Image src={process.env.REACT_APP_URL + product.img} alt={product.name}/>
            </ImageWrapper>
            <DescriptionWrapper>
                <InfoBlock>
                    <InfoTitle>{product.name}</InfoTitle>
                    <InfoWeight>{String(product.weight)} г.</InfoWeight>
                    <InfoDescription>{product.description}</InfoDescription>
                </InfoBlock>
                <BuyBlock>
                    <BuyPrice>{(product.price*count).toFixed(0)} ₽</BuyPrice>
                    <BuyOptions>
                        <Counter
                            value={count}
                            setValue={handleCount}
                        ></Counter>
                        <BuyButton
                            disabled={!isAuth}
                            onClick={handleBuy}
                        >
                            В корзину
                        </BuyButton>
                    </BuyOptions>
                </BuyBlock>
            </DescriptionWrapper>
        </Wrapper>
    );
};

export default ProductModal;