import React, {FC, memo} from 'react';
import styled from "styled-components";
import {FaCircleCheck} from "react-icons/fa6";
import {NotificationText, NotificationWrapper} from "./Notification";

const Wrapper = styled(NotificationWrapper)<{
    $isFade?: boolean
}>`
    background-color: #567328;
`

const Text = styled(NotificationText)`
    
`

const SuccessIcon = styled(FaCircleCheck)`
    color: #78e378;
`

interface SuccessNotificationProps {
    text: string
    isFade: boolean
    count: number
}

const SuccessNotification: FC<SuccessNotificationProps> = ({text, isFade}) => {
    return (
        <Wrapper $isFade={isFade}>
            <SuccessIcon />
            <Text>{text}</Text>
        </Wrapper>
    );
};

export default memo(SuccessNotification, (oldProps, newProps) => {
    return newProps.isFade === oldProps.isFade;
});