import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container} from "../Container";
import {useQuery} from "@apollo/client";
import {GET_ALL_CATEGORIES} from "../../graphql/query/category";
import {ICategory} from "../../types/Category";
import {FilledButton} from "../Button/Button";
import CartButton from "../CartButton/CartButton";
import {useParams} from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    height: 64px;
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    z-index: 100;
    
    &:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        z-index: -1;
    }
`

const Navigation = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;
`

const CategoriesHandler = styled.div`
    flex: 1;
`

const CategoryItem = styled.button`
    margin: 4px 0;
    padding: 10px 10px 10px 0;
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
    background-color: transparent;
    border: none;
    transition: color 0.5s ease;
    cursor: pointer;
    font-weight: var(--fw-bold);
    
    &:hover {
        color: var(--color-red);
    }
`

const CategoryNavigation = () => {
    const [categories, setCategories] = useState<ICategory[]>([])

    const {data, loading, error} = useQuery(GET_ALL_CATEGORIES);

    useEffect(() => {
        if(!loading) {
            setCategories(data.getCategories);
        }
    }, [data]);

    const handleNavigation = (categoryName: string) => {
        const category = document.querySelector(`[data-anchor-id=${categoryName}]`);
        if(category) {
            category.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            window.history.pushState(null, "", `/${categoryName}`);

        }

    }

    return (
        <Wrapper>
            <Container>
                <Navigation>
                    <CategoriesHandler>
                        {categories.map(category =>
                            <CategoryItem
                                onClick={e => handleNavigation(category.slug)}
                                key={category.id}
                            >
                                {category.name}
                            </CategoryItem>
                        )}
                    </CategoriesHandler>
                    <CartButton />
                </Navigation>
            </Container>
        </Wrapper>
    );
};

export default CategoryNavigation;