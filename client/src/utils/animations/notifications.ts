import {keyframes} from "styled-components";

export const NotificationShowAnimation = keyframes`
    from {
        transform: translateX(130%);
    }
    to {
        transform: translateX(0);
    }
`

export const NotificationFadeAnimation = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(130%);
    }
`