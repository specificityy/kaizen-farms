import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import farmer from '../img/farmer.jpg';
import { TextBlock } from '../components/TextBlock';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import theme from '../components/theme';

export const AboutPageTemplate = ({ heading, subheading, description, image }) => {
    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="about-us-parallax-group" id="about">
                <BaseLayer variant="base">
                    <StyledTextBlock heading={heading} subheading={subheading} description={description} />
                </BaseLayer>
                <StyledHeroBackground variant="back" />
            </MainParallaxGroup>
        </ThemeProvider>
    );
};

const MainParallaxGroup = styled(ParallaxGroup)`
    height: 120vh;
    min-height: 900px;
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
    @media (${({ theme }) => theme.mediaQueries.s}) {
        top: 40%;
    }
    &::before {
        content: '';
        display: block;
        background: rgba(20, 25, 30, 0.3);
        height: 100%;
    }
`;

AboutPageTemplate.propTypes = {
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const AboutPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;
    return <AboutPageTemplate {...frontmatter} />;
};

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                heading
                subheading
                description
            }
        }
    }
`;
