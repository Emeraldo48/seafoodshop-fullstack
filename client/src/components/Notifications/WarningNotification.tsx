import React, {FC} from 'react';
import styled from "styled-components";
import {FaTriangleExclamation} from "react-icons/fa6";
import {NotificationText, NotificationWrapper} from "./Notification";

const Wrapper = styled(NotificationWrapper)<{
    $isFade?: boolean
}>`
    background-color: #baba3e;
`

const Text = styled(NotificationText)`
    
`

const WarningIcon = styled(FaTriangleExclamation)`
    color: yellow;
`

interface WarningNotificationProps {
    text: string
    isFade: boolean
}

const WarningNotification: FC<WarningNotificationProps> = ({text, isFade}) => {
    return (
        <Wrapper $isFade={isFade}>
            <WarningIcon />
            <Text>{text}</Text>
        </Wrapper>
    );
};

export default WarningNotification;