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
                        description={
                            <>
                                <p>
                                    At Kaizen farms we put the effort to bring you the best quality. This is our promise
                                    to you:
                                </p>
                                <List>
                                    <li>Sole use of agrochemicals approved byt the FDA and the European guidelines.</li>
                                    <li>Phytosanitary registry.</li>
                                    <li>
                                        Key location for commercialization: 45min from our farm to the airport/seaport.
                                    </li>
                                    <li>Sole use of certified seeds for the germination process.</li>
                                    <li>
                                        Customs management for exporting: guarantee of origin, commercial invoice,
                                        declaration of application form and shipment.
                                    </li>
                                </List>
                            </>
                        }
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
