import React, {FC} from 'react';
import styled from "styled-components";
import {FaCircleXmark} from "react-icons/fa6";
import {NotificationText, NotificationWrapper} from "./Notification";

const Wrapper = styled(NotificationWrapper)<{
    $isFade?: boolean
}>`
    background-color: #d85959;
`

const Text = styled(NotificationText)`
    
`

const ErrorIcon = styled(FaCircleXmark)`
    color: red;
`

interface ErrorNotificationProps {
    text: string
    isFade: boolean
}

const ErrorNotification: FC<ErrorNotificationProps> = ({text, isFade}) => {
    return (
        <Wrapper $isFade={isFade}>
            <ErrorIcon />
            <Text>{text}</Text>
        </Wrapper>
    );
};

export default ErrorNotification;