import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Peppers from '../img/peppers.svg';
import vegetables from '../img/vegetables-market.jpg';
import logo from '../img/logo-no-text.png';
import { TitleAndContent } from '../components/TitleAndContent';
import { Container } from '../components/Container';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';

export const HomePageTemplate = React.forwardRef(({ title, description, image, className, ...props }, ref) => {
    return (
        <StyledContainer>
            <LeftSide variant="base" name="text">
                <StyledLogo />
                <Title>{title}</Title>
                <Tagline>{description}</Tagline>
            </LeftSide>
            <StyledHeroBackground name="hero-background" variant="back" />
        </StyledContainer>
    );
});

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

const LeftSide = styled(ParallaxLayer)`
    padding: 1rem 2rem;
    height: fit-content;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Title = styled.h1`
    font-size: 7rem;
    font-weight: 800;
    color: white;
`;

const Tagline = styled.div`
    font-size: 2rem;
    color: white;
`;

const StyledContainer = styled(ParallaxGroup)``;

const StyledHeroBackground = styled(ParallaxLayer)`
    background: url(${vegetables});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &::before {
        content: '';
        display: block;
        background: rgba(20, 25, 30, 0.3);
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
