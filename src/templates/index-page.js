import React, { useState, useEffect, useRef } from 'react';
import Measure from 'react-measure';
import styled from '@emotion/styled';
import throttle from 'lodash/throttle';

import Layout from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';
import { ServicesPage } from '../components/ServicesPage';
import { AboutPage } from '../components/AboutPage';

const IndexPage = () => {
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const home = useRef(null);
    const prod = useRef(null);
    const about = useRef(null);
    const services = useRef(null);

    useEffect(() => {
        const onScroll = throttle(event => {
            const scroll = window.pageYOffset || document.documentElement.scrollTop;

            home.current.style.transform = `translateY(-${scroll}px)`;

            about.current.style.transform = `translateY(-${scroll > pageHeight * 2 ? scroll - pageHeight * 2 : 0}px)`;
            prod.current.style.transform = `translateY(-${scroll > pageHeight ? scroll - pageHeight : 0}px)`;
            home.current.style.transform = `translateY(-${scroll}px)`;
        }, 0);

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <Layout>
            <Measure
                bounds
                onResize={contentRect => {
                    setPageHeight(contentRect.bounds.height);
                }}
            >
                {({ measureRef }) => (
                    <PageView ref={measureRef} name="page-view">
                        {/* <TitleCurtain>
                            <Title>Kaizen Farms</Title>
                        </TitleCurtain>
                        <TitleCurtain>
                            <Title>Our Products</Title>
                        </TitleCurtain>
                        <TitleCurtain>
                            <Title>Who we are</Title>
                        </TitleCurtain>
                        <TitleCurtain>
                            <Title>We ship anywhere</Title>
                        </TitleCurtain> */}
                        <HomePage ref={home} style={{ zIndex: 100, background: 'rgba(200,200,200, 1' }} />
                        <ProductsPage ref={prod} style={{ zIndex: 80, background: 'rgba(200,200,200, 1' }} />
                        <AboutPage ref={about} style={{ zIndex: 60, background: 'rgba(200,200,200, 1' }} />
                        <ServicesPage ref={services} style={{ zIndex: 40, background: 'rgba(200,200,200, 1' }} />
                    </PageView>
                )}
            </Measure>
        </Layout>
    );
};

const PageView = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: white;
`;

const Title = styled.h1`
    color: #1c1c1c;
`;

export default IndexPage;
