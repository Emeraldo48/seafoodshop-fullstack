import React from 'react';
import styled from "styled-components";
import CategoryNavigation from "../CategoryNavigation/CategoryNavigation";
import ProductsList from "../ProductsList/ProductsList";
import Slider from "../Slider/Slider";

const Wrapper = styled.main`
    position: relative;
`

const Shop = () => {
  return (
    <Wrapper>
      <CategoryNavigation/>
      <Slider>
        <img src={process.env.REACT_APP_URL + `/${1}.webp`} alt={String(1)} draggable={false}/>
        <img src={process.env.REACT_APP_URL + `/${2}.webp`} alt={String(2)} draggable={false}/>
        <img src={process.env.REACT_APP_URL + `/${3}.webp`} alt={String(3)} draggable={false}/>
      </Slider>
      <ProductsList/>
    </Wrapper>
  );
};

export default Shop;