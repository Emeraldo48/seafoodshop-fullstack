import React, {FC, SetStateAction} from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    border-radius: 20px;
    background-color: #ECECEC;

`

const Option = styled.button<{$isMini: boolean}>`
    padding: ${props => props.$isMini ? 5 : 10}px 8px;
    height: ${props => props.$isMini ? 25 : 40}pxpx;
    border: none;
    background-color: transparent;
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
    cursor: pointer;
    vertical-align: center;
    
    &:focus {
        outline: none;
    }
    
    &[disabled] {
        opacity: 0.3;
        pointer-events: none;
        user-select: none;
    }
`

const ShowValue = styled.div<{$isMini: boolean}>`
    padding: ${props => props.$isMini ? 5 : 10}px 8px;
    height: ${props => props.$isMini ? 25 : 40}pxpx;
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
    font-weight: var(--fw-bold);
    min-width: 2em;
    text-align: center;
`

interface CounterProps {
    value: number
    setValue: (value: number) => void
    isMini?: boolean
    canBeZero?: boolean
}


const Counter: FC<CounterProps> = ({value, setValue, isMini = false, canBeZero = false}) => {

    return (
        <Wrapper onClick={e => e.stopPropagation()}>
            <Option
                $isMini={isMini}
                onClick={e => setValue(value-1)}
                disabled={!canBeZero && value < 2}
            >-</Option>
            <ShowValue
                $isMini={isMini}
            >
                {value}
            </ShowValue>
            <Option
                $isMini={isMini}
                onClick={e => setValue(value+1)}
            >
                +
            </Option>
        </Wrapper>
    );
};

export default Counter;