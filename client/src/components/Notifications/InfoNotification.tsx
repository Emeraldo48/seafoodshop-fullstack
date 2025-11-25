import React, {FC} from 'react';
import styled from "styled-components";
import {FaCircleInfo} from "react-icons/fa6";
import {NotificationText, NotificationWrapper} from "./Notification";

const Wrapper = styled(NotificationWrapper)<{
  $isFade?: boolean
}>`
    background-color: lightgray;
`

const Text = styled(NotificationText)`

`

const InfoIcon = styled(FaCircleInfo)`
    color: gray;
`

interface InfoNotificationProps {
  text: string
  isFade: boolean
  count: number
}

const InfoNotification: FC<InfoNotificationProps> = ({text, isFade}) => {
  return (
    <Wrapper $isFade={isFade}>
      <InfoIcon/>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default InfoNotification;