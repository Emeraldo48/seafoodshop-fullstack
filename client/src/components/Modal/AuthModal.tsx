import React, {FC, useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import {EmailInput, PasswordInput} from "../Input/Input";
import {BigButton, Button} from "../Button/Button";
import useDebounce from "../../hooks/useDebounce";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Loading} from "../Loading/Loading";
import {registration, tryToLogin} from "../../store/reducers/ActionCreators";
import {modalSlice} from "../../store/reducers/modalSlice";
import {userSlice} from "../../store/reducers/userSlice";
import {notificationSlice} from "../../store/reducers/notificationSlice";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 15px;
    color: var(--color-text-primary);
    width: 380px;
`

const SwitchWrapper = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const SwitchButton = styled(Button)<{
  $active: boolean
}>`
    flex: 1;
    border-radius: 0;
    
    &:first-child {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
    }
    
    &:last-child {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
    }
    
    ${({$active}) => $active && css`
        background-color: var(--color-red);
        color: var(--color-white);
        pointer-events: none;
    `}}
`

const InputsHandler = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    width: 300px;
`

const ErrorMessage = styled.p`
    padding: 5px 10px;
    font-size: var(--font-size-sm);
    color: var(--color-red);
    text-align: center;
`

const AuthModal: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const checkDebounce = useDebounce(checkIsValid, 500);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const {isAuth, isLoading, error} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.clearError())
    checkDebounce();
  }, [email, password])

  useEffect(() => {
    if (isAuth) {
      dispatch(modalSlice.actions.clearModalWindow());
    }
  }, [isAuth])

  const switchHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: boolean) => {
    e.preventDefault();
    setIsLogin(value);
  }

  function emailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError("");
    setIsValid(false);
  }

  function passwordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordError("");
    setIsValid(false);
  }

  function checkIsValid() {
    const emailRegex = new RegExp('^((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$', '');
    let ctrl = true;

    if (!emailRegex.test(email)) {
      if (email) setEmailError('Неправильный емейл');
      ctrl = false;
      setIsValid(false);
    }

    if (password.length < 4) {
      if (password) setPasswordError('Пароль должен быть длиннее 4-х символов');
      ctrl = false;
      setIsValid(false);
    }

    setIsValid(ctrl);
  }

  const loginButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(tryToLogin(email, password));
  }

  const registrationButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(registration(email, password));
  }

  return (
    <Form>
      <SwitchWrapper>
        <SwitchButton
          onClick={(e) => switchHandler(e, true)}
          $active={isLogin}
        >
          Вход
        </SwitchButton>

        <SwitchButton
          onClick={(e) => switchHandler(e, false)}
          $active={!isLogin}
        >
          Регистрация
        </SwitchButton>
      </SwitchWrapper>

      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>


      <InputsHandler>
        <EmailInput
          onChange={e => emailHandler(e)}
          placeholder="Введите почту"
        />

        <ErrorMessage>{emailError}</ErrorMessage>

        <PasswordInput
          onChange={e => passwordHandler(e)}
          placeholder="Введите пароль"
        />

        <ErrorMessage>{passwordError}</ErrorMessage>
      </InputsHandler>


      {isLogin
        ?
        <>
          <BigButton
            $unactive={!!isLoading}
            onClick={loginButtonHandler}
            disabled={!isValid}
          >
            {!isLoading
              ? "Войти"
              : <Loading/>
            }
          </BigButton>
        </>
        :
        <>
          <BigButton
            $unactive={!!isLoading}
            onClick={registrationButtonHandler}
            disabled={!isValid}
          >
            {!isLoading
              ? "Зарегистрироваться"
              : <Loading/>
            }
          </BigButton>

        </>
      }
      {error && <ErrorMessage>{error}</ErrorMessage>}

    </Form>
  );
};

export default AuthModal;