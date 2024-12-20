import styled from "styled-components";
import {FaSpinner} from "react-icons/fa6"
import {wrapAnimation} from "../../utils/animations/animations";

export const Loading = styled(FaSpinner)`
    color: var(--color-white);
    animation: ${wrapAnimation} 1s linear infinite;
`