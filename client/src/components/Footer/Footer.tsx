import React from 'react';
import styled from "styled-components";
// @ts-ignore
import logo from '../../static/img/logo.png'

const Wrapper = styled.footer`
    display: flex;
    row-gap: 10px;
    justify-content: space-between;
    background-color: var(--footer-bg-color);
    padding: 30px calc((100vw - 1080px)/2);
    height: 150px;
`

const BrandWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const LogoImage = styled.img.attrs({
  src: logo,
  alt: 'logo'
})`
    width: 143px;
    height: 32px;
`

const PhoneNumber = styled.a`
    margin-top: 20px;
    font-size: var(--font-size-bg);
    font-weight: var(--fw-bold);
    text-decoration: none;
    color: var(--color-white);
    transition: color 0.2s ease;
    
    &:hover {
        color: var(--color-red);
    }
    
`

const Footer = () => {
  return (
    <Wrapper>
      <BrandWrapper>
        <LogoImage/>
        <PhoneNumber href={'tel:+78005553535'}>+7 (800) 555-35-35</PhoneNumber>
      </BrandWrapper>
    </Wrapper>
  );
};

export default Footer;