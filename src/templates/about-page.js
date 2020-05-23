import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import farmer from '../img/farmer.jpg';
import { TitleAndContent } from '../components/TitleAndContent';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';

export const AboutPageTemplate = React.forwardRef(({ title, description, image, ...props }, ref) => {
    return (
        <ParallaxGroup>
            <BaseParallax variant="base">
                <BaseText>
                    <SubHeading>About us</SubHeading>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </BaseText>
            </BaseParallax>
            <StyledHeroBackground variant="back" />
        </ParallaxGroup>
    );
});

const BaseParallax = styled(ParallaxLayer)`
    color: black;
`;

const BaseText = styled.div`
    background: white;
    padding: 1rem 2rem;
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
`;

const SubHeading = styled.p`
    margin-top: -5rem;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: #c0c0c3;
`;

const Title = styled.h1`
    font-size: 5rem;
    font-weight: 700;
    color: #1c1c1c;
`;

const Description = styled.p`
    font-size: 1.5rem;
    color: #8b8b92;
    max-width: 1000px;
`;

const StyledHeroBackground = styled(ParallaxLayer)`
    top: 22%;
    background: url(${farmer});
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

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const AboutPage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <AboutPageTemplate
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            image={post.frontmatter.image}
        />
    );
};

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                description
            }
        }
    }
`;
