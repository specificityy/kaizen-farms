import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import farmer from '../img/farmer.jpg';
import { TextBlock } from '../components/TextBlock';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';

export const AboutPageTemplate = ({ title, description, image }) => {
    return (
        <MainParallaxGroup name="about-us-parallax-group" id="about">
            <BaseLayer variant="base">
                <StyledTextBlock title={title} description={description} subheading="About us" />
            </BaseLayer>
            <StyledHeroBackground variant="back" />
        </MainParallaxGroup>
    );
};

const MainParallaxGroup = styled(ParallaxGroup)`
    height: 120vh;
`;

const BaseLayer = styled(ParallaxLayer)`
    color: black;
`;

const StyledTextBlock = styled(TextBlock)`
    min-height: 25%;
`;

const StyledHeroBackground = styled(ParallaxLayer)`
    top: 23%;
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
