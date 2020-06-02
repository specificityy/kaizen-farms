import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import kebabCase from 'lodash/kebabCase';

import { TextBlock } from '../components/TextBlock';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import theme from '../components/theme';
import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';

export const AboutPageTemplate = ({ pageName, heading, subheading, description, backgroundAbout }) => {
    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="about-us-parallax-group" id={kebabCase(pageName)}>
                <BaseLayer variant="base">
                    <StyledTextBlock heading={heading} subheading={subheading} description={description} />
                </BaseLayer>
                <StyledHeroBackground name="about-hero-background" variant="back">
                    <OverlayShade />
                    <BackgroundImage imageInfo={backgroundAbout} />
                </StyledHeroBackground>
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
    @media (${({ theme }) => theme.mediaQueries.s}) {
        top: 40%;
    }
`;

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
    background: rgba(20, 25, 30, 0.3);
`;

AboutPageTemplate.propTypes = {
    pageName: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    backgroundAbout: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
                pageName
                heading
                subheading
                description
                backgroundAbout {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 50) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
