import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import { TextBlock } from '../components/TextBlock';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { Map } from '../components/map/Map';
import theme from '../components/theme';

export const ServicesPageTemplate = ({ title }) => {
    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="services-parallax-group" id="services">
                <BaseParallax variant="base" name="services-text">
                    <StyledTextBlock
                        title={title}
                        description="Proin vel ante placerat velit eleifend dignissim blandit nec tortor. Mauris ut tellus lobortis,
                        mattis leo non, laoreet arcu. Nunc nec mi vitae nisi rutrum pretium."
                        subheading="Our Services"
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
    height: 100vh;
    @media (${({ theme }) => theme.mediaQueries.m}) {
        height: 120vh;
    }
`;

const BaseParallax = styled(ParallaxLayer)`
    color: black;
`;

const StyledHeroMap = styled(ParallaxLayer)`
    top: 28%;
    height: 80%;
    @media (${({ theme }) => theme.mediaQueries.m}) {
        top: 23%;
    }
`;

const StyledTextBlock = styled(TextBlock)`
    min-height: 500px;
`;

const ServicesPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return <ServicesPageTemplate title={frontmatter.title} services={frontmatter.services} image={frontmatter.image} />;
};

export const servicesPageQuery = graphql`
    query ServicesPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                services {
                    title
                    description
                    image {
                        childImageSharp {
                            fluid(maxWidth: 1500, quality: 90) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
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
    title: PropTypes.string,
    services: PropTypes.array,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ServicesPage;
