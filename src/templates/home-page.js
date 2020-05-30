import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';

import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import theme from '../components/theme';
import Logo from '../assets/img/logo-no-text-color.svg';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';

export const HomePageTemplate = ({ heading, description, imageHome }) => {
    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="home-parallax-group" id="home">
                <CenteredText variant="base" name="text-layer">
                    <AnimateContainer delay={500}>
                        <StyledLogo />
                    </AnimateContainer>
                    <AnimateContainer delay={700}>
                        <Heading>{heading}</Heading>
                    </AnimateContainer>
                    <AnimateContainer delay={1000}>
                        <Subheading>{description}</Subheading>
                    </AnimateContainer>
                    <AnimateContainer delay={1300}>
                        <Underscore />
                    </AnimateContainer>
                </CenteredText>
                <ParallaxLayer name="hero-background" variant="deep">
                    <OverlayShade />
                    <BackgroundImage imageInfo={imageHome} />
                </ParallaxLayer>
            </MainParallaxGroup>
        </ThemeProvider>
    );
};

const BackgroundImage = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const OverlayShade = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(20, 25, 30, 0.4);
`;

const MainParallaxGroup = styled(ParallaxGroup)`
    min-height: 800px;
`;

const CenteredText = styled(ParallaxLayer)`
    padding: 1rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: 30%;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        top: 20%;
    }
`;

const Heading = styled.h1`
    ${({ theme }) =>
        `font-size: 6rem;
        font-weight: 900;
        color: white;
        @media (${theme.mediaQueries.s}) {
            font-size: 3rem;
            margin-bottom: 20px;
        }
    `}
`;

const Subheading = styled.h2`
    font-size: 2rem;
    color: white;
    position: relative;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        font-size: 1.3rem;
    }
`;

const Underscore = styled.div`
    width: 75px;
    height: 15px;
    border-radius: 20px 0 20px;
    background: #8bc53f;
    margin-top: 25px;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        height: 10px;
        margin-top: 20px;
    }
`;

const StyledLogo = styled(Logo)`
    width: 160px;
    height: 165px;
    background-size: 700px auto;
    margin-bottom: 20px;
    filter: drop-shadow(2px 3px 2px black);
    @media (${({ theme }) => theme.mediaQueries.s}) {
        width: 81px;
        height: 82px;
    }
`;

const AnimateContainer = styled.div`
    ${({ delay, theme: { transitions } }) => css`
        overflow: hidden;
        & > * {
            will-change: transform;
            transform: translateY(120%);
            opacity: 0.1;
            animation: ${transitions.duration.long}ms ${revealUp} ${transitions.easing.noNameYet} forwards;
            animation-delay: ${delay}ms;
        }
    `}
`;

const revealUp = keyframes`
    from {
        opacity: 0.1;
        transform: translateY(120%);
    }
    to {
        opacity: 1;
        transform: translate(0);
    }
`;

HomePageTemplate.propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageHome: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const HomePage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;
    return <HomePageTemplate {...frontmatter} />;
};

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HomePage;

export const homePageQuery = graphql`
    query HomePage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                heading
                description
                imageHome {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
