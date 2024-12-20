import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import WarningNotification from "./WarningNotification";
import ErrorNotification from "./ErrorNotification";
import InfoNotification from "./InfoNotification";
import SuccessNotification from "./SuccessNotification";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {NotificationType} from "../../types/INotification";
import {notificationSlice} from "../../store/reducers/notificationSlice";

const Wrapper = styled.output`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 300px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`



const NotificationsList = () => {
    const dispatch = useAppDispatch();
    const {notifications} = useAppSelector(state => state.notificationReducer);
    const intervalRef = useRef<null | NodeJS.Timeout>(null);

    useEffect(() => {
        if(notifications.length === 0) {
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } else {
            if(!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    dispatch(notificationSlice.actions.tickNotifications());
                }, 10);
            }
        }
    }, [notifications])

    return (
        <Wrapper>
            {
                notifications.map((notification, id) => {
                    switch (notification.type) {
                        case NotificationType.SUCCESS: {
                            return <SuccessNotification key={id} text={notification.message} isFade={notification.duration <= 300} />
                        }
                        case NotificationType.INFO: {
                            return <InfoNotification key={id} text={notification.message} isFade={notification.duration <= 300} />
                        }
                        case NotificationType.WARNING: {
                            return <WarningNotification key={id} text={notification.message} isFade={notification.duration <= 300} />
                        }
                        case NotificationType.ERROR: {
                            return <ErrorNotification key={id} text={notification.message} isFade={notification.duration <= 300} />
                        }
                        default: {
                            return <ErrorNotification key={id} text={notification.message} isFade={notification.duration <= 300} />
                        }
                    }
                })
            }
        </Wrapper>
    );
};

export default NotificationsList;