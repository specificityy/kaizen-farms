import React from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Layout } from 'antd';

import './all.sass';
import { cssReset } from './cssReset';
import useSiteMetadata from './SiteMetadata';
import FooterComponent from '../components/Footer';
import Navbar from '../components/Navbar';

const { Footer, Content } = Layout;

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

            <Layout>
                <Navbar />
                <StyledContent>{children}</StyledContent>
                <Footer>
                    <FooterComponent />
                </Footer>
            </Layout>
        </>
    );
};

const StyledContent = styled(Layout.Content)`
    background: #fff;
`;

const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@100;300;400;700;900&family=Open+Sans:wght@300;400;700&display=swap');
                ${cssReset}
                * {
                    font-family: 'Open Sans', sans-serif;
                }
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-family: 'Cairo', sans-serif;
                }
            `}
        />
    );
};

export default TemplateWrapper;
