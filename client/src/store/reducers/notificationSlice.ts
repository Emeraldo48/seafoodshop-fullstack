import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INotification} from "../../types/INotification";

export interface NotificationState {
    notifications: INotification[]
}

const initialState: NotificationState = {
    notifications: []
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<INotification>) => {
            const finded = state.notifications.find(el => action.payload.message === action.payload.message);
            if(finded)
                finded.duration = action.payload.duration
            else
            state.notifications.unshift(action.payload)
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
        tickNotifications: (state) => {
            state.notifications.forEach(notification => {
                notification.duration -= 10;
                if(notification.duration === 0) {
                    state.notifications = state.notifications.filter(item => item.id !== notification.id);
                }
            });
        }
    }
})

export default notificationSlice.reducer;