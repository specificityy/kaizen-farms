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
            <ParallaxGroup name="home-parallax-group" id="home">
                <CenteredText variant="base" name="text-layer">
                    <AnimateContainer delay={500}>
                        <StyledLogo />
                    </AnimateContainer>
                    <AnimateContainer delay={700}>
                        <Title>{title}</Title>
                    </AnimateContainer>
                    <AnimateContainer delay={900}>
                        <Subheading>{description}</Subheading>
                    </AnimateContainer>
                </CenteredText>
                <StyledHeroBackground name="hero-background" variant="deep" />
            </ParallaxGroup>
        </ThemeProvider>
    );
};

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

const AnimateContainer = styled.div`
    ${({ delay, theme: { transitions } }) => css`
        overflow: hidden;
        & > * {
            transition: transform ${transitions.duration.complex}ms;
            transform: translateY(120%);
            animation: 0.8s ${revealUp} cubic-bezier(0.24, 0.72, 0.35, 1.01) ${delay}ms forwards;
        }
    `}
`;

const revealUp = keyframes`
    from {
        transform: translateY(120%);
    }
    to {
        transform: translate(0);
    }
`;

const CenteredText = styled(ParallaxLayer)`
    padding: 1rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: fit-content;
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
    &::before {
        content: '';
        width: 20%;
        height: 10px;
        border-radius: 20px 0 20px;
        background: crimson;
        position: absolute;
        top: 150%;
        left: 50%;
        transform: translateX(-50%);
    }
    @media (${({ theme }) => theme.mediaQueries.s}) {
        font-size: 1.3rem;
        &::before {
            height: 7px;
        }
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
    @media (${({ theme }) => theme.mediaQueries.s}) {
        transform: scale(0.5) translateY(50%);
    }
`;

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
