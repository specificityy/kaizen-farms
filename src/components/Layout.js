import React from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { BackTop } from 'antd';

import { cssReset } from './cssReset';
import useSiteMetadata from './SiteMetadata';
import { Parallax } from './Parallax';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';
import theme from '../components/theme';

const TemplateWrapper = ({ children }) => {
    const { title, description } = useSiteMetadata();
    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />

                <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix('/')}img/apple-touch-icon.png`} />
                <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-32x32.png`} sizes="32x32" />
                <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-16x16.png`} sizes="16x16" />

                <link rel="mask-icon" href={`${withPrefix('/')}img/safari-pinned-tab.svg`} color="#ff4400" />
                <meta name="theme-color" content="#fff" />

                <meta property="og:type" content="business.business" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content="/" />
                <meta property="og:image" content={`${withPrefix('/')}img/og-image.jpg`} />
            </Helmet>
            <GlobalStyles />

            <ThemeProvider theme={theme}>
                <StyledContent>
                    <Navbar />
                    {children}
                    <Footer />

                    <BackTop name="back-top">
                        <StyledUp>UP</StyledUp>
                    </BackTop>
                </StyledContent>
            </ThemeProvider>
        </>
    );
};

const StyledContent = styled(Parallax)`
    background: white;
    color: #1c1c1c;
`;

const StyledUp = styled.div`
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 14px;
`;

const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;700;800&display=swap');
                ${cssReset}
                * {
                    font-family: 'Josefin Sans', sans-serif;
                }
            `}
        />
    );
};

// scroll styles, add to the * element
/*
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background: #1c1c1c;
        border-radius: 10px;
    }

    &::-webkit-scrollbar {
        width: 10px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #424242;
    }
*/

export default TemplateWrapper;
