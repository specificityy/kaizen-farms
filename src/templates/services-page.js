import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import kebabCase from 'lodash/kebabCase';

import { TextBlock } from '../components/TextBlock';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { Map } from '../components/map/Map';
import theme from '../components/theme';

export const ServicesPageTemplate = ({ pageName, heading, subheading, description, bulletPoints }) => {
    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="services-parallax-group" id={kebabCase(pageName)}>
                <BaseParallax variant="base" name="services-text">
                    <StyledTextBlock heading={heading} description={description} subheading={subheading} />
                </BaseParallax>
                <StyledHeroMap variant="back" name="services-map">
                    <Map />
                </StyledHeroMap>
            </MainParallaxGroup>
        </ThemeProvider>
    );
};

const MainParallaxGroup = styled(ParallaxGroup)`
    height: 120vh;
    min-height: 1200px;
    @media (${({ theme }) => theme.mediaQueries.m}) {
        height: 170vh;
    }
`;

const BaseParallax = styled(ParallaxLayer)`
    color: black;
`;

const StyledHeroMap = styled(ParallaxLayer)`
    top: 23%;
    height: 80%;
`;

const StyledTextBlock = styled(TextBlock)`
    min-height: 600px;
`;

const List = styled.ul`
    margin-left: 40px;
    & > li {
        margin-top: 30px;
        list-style: circle;
    }
`;

const ServicesPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;
    return <ServicesPageTemplate {...frontmatter} />;
};

export const servicesPageQuery = graphql`
    query ServicesPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                pageName
                heading
                subheading
                description
            }
        }
    }
`;

ServicesPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

ServicesPageTemplate.propTypes = {
    pageName: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
};

export default ServicesPage;
