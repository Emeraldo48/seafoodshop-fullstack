import React, {FC, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {SHOP_ROUTE} from "../../types/consts";

const Wrapper = styled.div`
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImageController = styled.div<{$width: number}>`
    display: flex;
    max-width: ${props => props.$width}px;
    height: 100%;
    position: relative;
    margin: 0 auto;
`

const ImageLine = styled.div<{ $offset: number, $isActive: boolean }>`
    display: flex;
    width: 100%;
    height: 100%;
    transition: ${props => props.$isActive ? 'transform 0.2s linear' : 'none'};
    transform: translateX(${props => props.$offset * -1}px);
`


const ImageWrapper = styled.div<{$width: number, $isActive: boolean}>`
    width: ${props => props.$width}px;
    padding: 0 10px;
    height: 100%;
    position: relative;

    & img {
        width: ${props => props.$width-20}px;
        height: 100%;
        border-radius: 20px;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,0.4);
        opacity: ${({$isActive}) => $isActive ? 0 : 1};
    }
    
`



const ArrowButton = styled.button`
    flex-grow: 1;
    border: none;
    background-color: transparent;
    cursor: pointer;
    z-index: 1;
    color: var(--color-white);
    font-size: 32px;
    transition: opacity 0.2s linear;
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    opacity: 0;
    

    &:first-child {
        justify-content: flex-end;
    }

    &:hover {
        opacity: 1;
    }

    &:after {
        content: attr(data-text);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-text-primary);
    }
`

interface SliderProps {
    children: React.ReactNode
}
const Slider: FC<SliderProps> = ({children}) => {
    const [pageWidth, setPageWidth] = useState(1300);
    const [images, setImages] = useState<React.ReactNode[]>([]);
    const [offset, setOffset] = useState(pageWidth*2);
    const [isMove, setIsMove] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<null | NodeJS.Timer>(null);
    const imageLineRef = useRef<null | HTMLDivElement>(null);
    const intersectedRef = useRef<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if(width < 1500 && pageWidth === 1300) {
                setPageWidth(1000);
                setOffset(2000);
            } else if(width > 1500 && pageWidth === 1000) {
                setPageWidth(1300);
                setOffset(2600);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])


    useEffect(() => {
        let childrenArray = React.Children.toArray(children);
        if(childrenArray.length < 6) {
            let arrayLength = childrenArray.length;
            for(let i = arrayLength; i < 6; i++) {
                childrenArray = [...childrenArray, childrenArray[(i-arrayLength) % arrayLength]];
            }
        }
        setImages(childrenArray.map((image, index) =>
                image
        ));
    }, [pageWidth]);

    useEffect(() => {
        localStorage.setItem('offset', offset.toString());
    }, [offset]);

    useEffect(() => {
        const imageLine = imageLineRef.current as HTMLDivElement;
        const observer = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting) {
                    console.log('intersected');
                    if(!intersectedRef.current) {
                        intersectedRef.current = true;
                    } else {
                        window.history.pushState(null, "", SHOP_ROUTE);
                    }
                }
            },
            {
                threshold: 0.6
            }
        )
        observer.observe(imageLine);
        return () => observer.unobserve(imageLine);
    }, [imageLineRef]);

    const handleLeftClick = () => {
        if(isMove) return;
        setImages(prevState => [prevState[prevState.length-1],...prevState.slice(0, prevState.length-1)]);
        setOffset(prevState => pageWidth*3 - (pageWidth*2 - prevState));
        //setOffset(pageWidth*3);
        setIsMove(true);
        restartInterval();
        setTimeout(() => {
            setIsActive(true);
            setOffset(pageWidth*2);
            updateImages();
        }, 50);
    }

    const handleRightClick = () => {
        if(isMove) return;
        setImages(prevState => [...prevState.slice(1, prevState.length), prevState[0]]);
        setOffset(prevState => prevState - pageWidth);
        //setOffset(pageWidth);
        setIsMove(true);
        restartInterval();
        setTimeout(() => {
            setIsActive(true);
            setOffset(pageWidth*2);
            updateImages();
        }, 50);
    }
    const updateImages = () => {
        setTimeout(() => {
            setIsActive(false);
            setIsMove(false);
        }, 300);
    }

    useEffect(() => {
        restartInterval();
        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }
    }, []);
    const restartInterval = () => {
        if(intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            const currentOffset = Number(localStorage.getItem('offset')) || pageWidth * 2;
            if(currentOffset === pageWidth*2)
                handleRightClick();
        }, 5000);
    }

    const onDragStart = (e: DraggableEvent, pos: DraggableData) => {
        if(isMove) {
            e.preventDefault();
            return;
        }
    }
    const onDragStop = (e: DraggableEvent, pos: DraggableData) => {
        if(offset < pageWidth*1.8) {
            handleLeftClick();
        } else if(offset > pageWidth*2.2) {
            handleRightClick();
        } else {
            setOffset(pageWidth*2);
        }
    }

    const onDrag = (e: DraggableEvent, pos: DraggableData) => {
        const x = Math.abs(pos.x);
        setOffset(x);
    }

    return (
        <Wrapper
            ref={imageLineRef}
        >
            <ArrowButton data-text={"<"}
                         onClick={handleLeftClick}
            />
            <ImageController
                $width={pageWidth}
            >

                <Draggable
                    axis="x"
                    position={{x: -(offset), y: 0}}
                    onDrag={(e, pos) => onDrag(e, pos)}
                    onStart={(e, pos) => onDragStart(e, pos)}
                    onStop={(e, pos) => onDragStop(e, pos)}
                >
                    <ImageLine
                        $offset={offset}
                        $isActive={isActive}
                    >
                        {images.map((image: React.ReactNode, index) =>
                            <ImageWrapper
                                $width={pageWidth}
                                $isActive={index === 2}
                                key={index}
                            >
                                {image}
                            </ImageWrapper>
                        )}
                    </ImageLine>

                </Draggable>
            </ImageController>
            <ArrowButton data-text={">"}
                         onClick={handleRightClick}
            />
        </Wrapper>
    );
};

export default Slider;