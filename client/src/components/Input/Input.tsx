import styled from "styled-components";

const BaseTextInput = styled.input`
    background-color: var(--color-white);
    color: var(--color-text-primary);
    padding: 8px 15px;
    border-radius: 5px;
    border: 1px solid var(--color-text-primary);
    font-size: var(--font-size-md);
    width: 100%;
    
    &:focus {
        outline: 1px solid var(--color-red);
        border-color: var(--color-red);
    }
`

export const TextInput = styled(BaseTextInput).attrs({
  type: "text"
})`

`

export const EmailInput = styled(BaseTextInput).attrs({
  type: "email"
})`
    
`

export const NumberInput = styled(BaseTextInput).attrs({
  type: "number"
})`
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`

export const PasswordInput = styled(BaseTextInput).attrs({
  type: "password"
})`

`

export const TextArea = styled.textarea`
    background-color: var(--color-white);
    color: var(--color-text-primary);
    padding: 8px 15px;
    border-radius: 5px;
    border: 1px solid var(--color-text-primary);
    font-size: var(--font-size-md);
    width: 100%;
    resize: vertical;
    font-weight: var(--fw-normal);
    font-family: "Roboto", sans-serif;
    max-height: 18em;
    min-height: 4em;
    
    &:focus {
        outline: 1px solid var(--color-red);
        border-color: var(--color-red);
    }
`

export const FileInput = styled.input.attrs({
  type: "file"
})`
    opacity: 1;
    width: 100%;
    height: 100px;
    position: relative;
    border-radius: 10px;
    
    &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: attr(data-text);
        background-color: var(--color-red);
        color: var(--color-white);
        border: 1px solid var(--color-red);
        font-size: var(--font-size-md);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`