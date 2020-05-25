import React, { useState, useEffect, useRef } from 'react';
import Measure from 'react-measure';
import styled from '@emotion/styled';
import throttle from 'lodash/throttle';

import Layout from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';
import { ServicesPage } from '../components/ServicesPage';
import { AboutPage } from '../components/AboutPage';
import farmer from '../img/farmer.jpg';

const IndexPage = () => {
    // const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const parallax = useRef(null);
    const home = useRef(null);
    const prod = useRef(null);
    const about = useRef(null);
    const services = useRef(null);

    // useEffect(() => {
    //     const onScroll = throttle(event => {
    //         const scroll = window.pageYOffset || document.documentElement.scrollTop;

    //         home.current.style.transform = `translateY(-${scroll}px)`;

    //         about.current.style.transform = `translateY(-${scroll > pageHeight * 2 ? scroll - pageHeight * 2 : 0}px)`;
    //         prod.current.style.transform = `translateY(-${scroll > pageHeight ? scroll - pageHeight : 0}px)`;
    //         home.current.style.transform = `translateY(-${scroll}px)`;
    //     }, 0);

    //     window.addEventListener('scroll', onScroll);

    //     return () => {
    //         window.removeEventListener('scroll', onScroll);
    //     };
    // }, []);

    return (
        <Layout>
            {/* <StyledFixedBackground name="fixed-background" /> */}
            <HomePage />
            <AboutPage />
            <ProductsPage />
            <ServicesPage />
        </Layout>
    );
};

const PageView = styled.div`
    height: 100vh;
    width: 100vw;
    background: white;
`;

const Title = styled.h1`
    color: #1c1c1c;
`;

const StyledFixedBackground = styled.div`
    height: 100%;
    width: 100%;
    background: url(${farmer});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    right: 0;
    position: fixed;
`;

export default IndexPage;
