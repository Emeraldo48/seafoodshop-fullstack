import styled, {css} from "styled-components";

export const Button = styled.button<{ $unactive?: boolean }>`
    background-color: transparent;
    border: 1px solid var(--color-red);
    color: var(--color-red);
    font-size: var(--font-size-md);
    border-radius: 15px;
    padding: 0 12px;
    line-height: 1.5em;
    cursor: pointer;
    transition: 0.3s;
    font-family: "Roboto", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    
    &:hover {
        background-color: var(--color-red);
        color: var(--color-white);
    }

    &:focus {
        outline: none;
    }
    
    &[disabled] {
        opacity: 0.3;
        pointer-events: none;
        user-select: none;
    }
    
    ${props => props.$unactive === true && css`
        pointer-events: none;
    `}
`

export const FilledButton = styled(Button)`
    background-color: var(--color-red);
    color: var(--color-white);
`

export const BigButton = styled(FilledButton)`
    min-width: 220px;
    min-height: 42px;
    padding: 6px 20px;
`