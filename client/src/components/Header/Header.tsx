import React from 'react';
import styled from "styled-components";
import {Container} from "../Container";
// @ts-ignore
import logo from '../../static/img/logo.png'
import {Button} from "../Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, SHOP_ROUTE} from "../../types/consts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {modalSlice} from "../../store/reducers/modalSlice";
import {userSlice} from "../../store/reducers/userSlice";
import AuthModal from "../Modal/AuthModal";
import {logout} from "../../store/reducers/ActionCreators";

const Wrapper = styled.header`
    min-height: 56px;
    width: 100%;
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LogoWrapper = styled(Link)`
    display: flex;
    align-items: center;
`

const LogoImage = styled.img.attrs({
  src: logo,
  alt: 'logo'
})`
    
`

const OptionsWrapper = styled.div`
    display: flex;
    column-gap: 10px;
`

const Header = () => {
  const {isAuth, role} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleExit = () => {
    dispatch(logout())
    navigate(SHOP_ROUTE);
  }

  return (
    <Wrapper>
      <Container>
        <Content>
          <LogoWrapper to={SHOP_ROUTE}>
            <LogoImage/>
          </LogoWrapper>
          <OptionsWrapper>
            {isAuth
              ?
              <>
                {role === "ADMIN" && <Button
                  onClick={e => navigate(ADMIN_ROUTE)}
                >
                  Админ-панель
                </Button>}
                <Button
                  onClick={e => handleExit()}
                >
                  Выйти
                </Button>
              </>
              :
              <>
                <Button
                  onClick={e => dispatch(modalSlice.actions.setModalWindow({Component: AuthModal}))}
                >
                  Войти
                </Button>
              </>
            }
          </OptionsWrapper>

        </Content>
      </Container>
    </Wrapper>

  );
};

export default Header;