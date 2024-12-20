import React, {FC, useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";

const Wrapper = styled.div`
    width: fit-content;
    height: 40px;
    display: flex;
    border: 1px solid var(--color-red);
    border-radius: 10px;
    align-self: flex-end;
`

const PageButton = styled.button<{$active?: boolean}>`
    width: 80px;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    font-weight: var(--fw-bold);
    border: none;
    transition: all 0.2s linear;
    border-right: 1px solid var(--color-red);
    user-select: none;
    
    ${props => props.$active && css`
        background-color: var(--color-red);
        color: var(--color-white);
        pointer-events: none;
    `}
    
    &:hover {
        background-color: var(--color-text-primary);
        color: var(--color-white);
    }
    
    &:first-child {
        border-radius: 8px 0 0 8px;
    }
    
    &:last-child {
        border-radius: 0 8px 8px 0;
        border-right: none;
    }
`

interface PaginationProps {
    page: number
    onSetPage: (page: number) => void
    elementsCount: number
    elementsPerPage: number
}

const Pagination: FC<PaginationProps> = ({page, onSetPage, elementsCount, elementsPerPage}) => {
    const [pagesCount, setPagesCount] = useState<number>(Math.floor(elementsCount / elementsPerPage)+1);
    const [pages, setPages] = useState<number[]>([]);

    useEffect(() => {
        setPages(Array.from({length: pagesCount}, (_, i) => i + 1));
    }, [page]);

    const handlePrompt = () => {
        const chosenPage = Number(prompt('Введите номер страницы', (page+1).toString()));
        if(Number.isInteger(chosenPage) && chosenPage % 1 === 0) {
            onSetPage(Math.max(Math.min(chosenPage-1, pagesCount-1), 0));
        } else {
            alert("Введите целое число");
        }
    }


    return (
        <Wrapper>
            {pagesCount < 7 ? <>
                {pages.map(pageNumber => <PageButton key={pageNumber} onClick={() => onSetPage(pageNumber-1)}>{pageNumber}</PageButton>)}
            </> :
            <>
                <PageButton $active={page === 0} onClick={() => onSetPage(0)}>1</PageButton>
                {
                    page < 2 ?
                        <>
                            <PageButton $active={page === 1} onClick={() => onSetPage(1)}>{2}</PageButton>
                            <PageButton $active={page === 2} onClick={() => onSetPage(2)}>{3}</PageButton>
                            <PageButton $active={page === 3} onClick={() => onSetPage(3)}>{4}</PageButton>
                        </>
                    : page < pagesCount-2
                        ?
                        <>
                            <PageButton onClick={() => onSetPage(page-1)}>{page}</PageButton>
                            <PageButton $active={true} onClick={() => onSetPage(page)}>{page+1}</PageButton>
                            <PageButton onClick={() => onSetPage(page+1)}>{page+2}</PageButton>
                        </>
                        :
                        <>
                            <PageButton onClick={() => onSetPage(pagesCount-4)}>{pagesCount-3}</PageButton>
                            <PageButton onClick={() => onSetPage(pagesCount-3)}>{pagesCount-2}</PageButton>
                            <PageButton $active={page === pagesCount-2} onClick={() => onSetPage(pagesCount-2)}>{pagesCount-1}</PageButton>
                        </>

                }

                <PageButton onClick={handlePrompt}>...</PageButton>
                <PageButton $active={page === pagesCount-1} onClick={() => onSetPage(pagesCount-1)}>{pagesCount}</PageButton>
            </>}
        </Wrapper>
    );
};

export default Pagination;