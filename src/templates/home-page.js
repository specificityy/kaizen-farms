import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import vegetables from '../img/peppers-basket.jpg';
import logo from '../img/logo-no-text.png';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';

export const HomePageTemplate = ({ title, description, image }) => {
    return (
        <ParallaxGroup name="home-parallax-group">
            <CenteredText variant="base" name="text-layer">
                <StyledLogo />
                <Title>{title}</Title>
                <Subheading>{description}</Subheading>
            </CenteredText>
            <StyledHeroBackground name="hero-background" variant="deep" />
        </ParallaxGroup>
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

const CenteredText = styled(ParallaxLayer)`
    padding: 1rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -58%);
`;

const Title = styled.h1`
    ${props => {
        // console.log(props);
        return `font-size: 6rem;
                font-weight: 900;
                color: white;`;
    }}
`;

const Subheading = styled.h2`
    font-size: 2rem;
    color: white;
    position: relative;
    &::before {
        content: '';
        width: 25%;
        height: 10px;
        border-radius: 20px 0 20px;
        background: crimson;
        position: absolute;
        top: 130%;
        left: 50%;
        transform: translateX(-50%);
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
    width: 85px;
    height: 85px;
    background: url(${logo}) no-repeat 50% scroll;
    background-size: contain;
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
