import React, {FC, ReactNode} from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    flex-grow: 1;
`

interface MainProps {
    children: ReactNode
}

const Main: FC<MainProps> = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

export default Main;