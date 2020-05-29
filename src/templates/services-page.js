import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { v4 as uuidv4 } from 'uuid';

import { TextBlock } from '../components/TextBlock';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { Map } from '../components/map/Map';
import theme from '../components/theme';

export const ServicesPageTemplate = ({ heading, subheading, description, bulletPoints }) => {
    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="services-parallax-group" id="services">
                <BaseParallax variant="base" name="services-text">
                    <StyledTextBlock
                        heading={heading}
                        description={
                            <>
                                <p>{description}</p>
                                <List>
                                    {bulletPoints.map(({ text }) => (
                                        <li key={uuidv4()}>{text}</li>
                                    ))}
                                </List>
                            </>
                        }
                        subheading={subheading}
                    />
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
                heading
                subheading
                description
                bulletPoints {
                    text
                }
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
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    bulletPoints: PropTypes.array,
};

export default ServicesPage;
