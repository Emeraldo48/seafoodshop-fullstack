import {NotificationFadeAnimation, NotificationShowAnimation} from "../../utils/animations/notifications";
import styled, {css} from "styled-components";

export const NotificationWrapper = styled.div<{
  $isFade?: boolean
}>`
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
    background-color: #e47e7e;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .3);
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    animation: ${NotificationShowAnimation} 0.3s linear;
    
    ${props => props.$isFade && css`
        animation: ${NotificationFadeAnimation} 0.3s linear;
        transform: translateX(130%);
    `}
`

export const NotificationText = styled.span`
    color: var(--color-white);
    font-size: var(--font-size-md);
    line-height: 1.5em;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
`