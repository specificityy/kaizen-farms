import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';

import vegetables from '../img/peppers-basket.jpg';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import theme from '../components/theme';
import logo from '../img/kaizen-farms-logo.png';

export const HomePageTemplate = ({ title, description }) => {
    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="home-parallax-group" id="home">
                <CenteredText variant="base" name="text-layer">
                    <AnimateContainer delay={500}>
                        <StyledLogo />
                    </AnimateContainer>
                    <AnimateContainer delay={700}>
                        <Title>{title}</Title>
                    </AnimateContainer>
                    <AnimateContainer delay={1000}>
                        <Subheading>{description}</Subheading>
                    </AnimateContainer>
                    <AnimateContainer delay={1300}>
                        <Underscore />
                    </AnimateContainer>
                </CenteredText>
                <StyledHeroBackground name="hero-background" variant="deep" />
            </MainParallaxGroup>
        </ThemeProvider>
    );
};

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

const Title = styled.h1`
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
    background: crimson;
    margin-top: 25px;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        height: 10px;
        margin-top: 20px;
    }
`;

const StyledHeroBackground = styled(ParallaxLayer)`
    background: url(${vegetables});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &::before {
        content: '';
        display: block;
        background: rgba(20, 25, 30, 0.4);
        height: 100%;
    }
`;

const StyledLogo = styled.div`
    width: 160px;
    height: 165px;
    background: url(${logo}) no-repeat 50% scroll;
    background-size: 700px auto;
    background-position: 17.3% 50%;
    margin-bottom: 20px;
    filter: drop-shadow(2px 4px 6px black);
    @media (${({ theme }) => theme.mediaQueries.s}) {
        width: 81px;
        height: 82px;
        background-size: 355px auto;
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const HomePage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <HomePageTemplate
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            image={post.frontmatter.image}
        />
    );
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
                title
                description
            }
        }
    }
`;
