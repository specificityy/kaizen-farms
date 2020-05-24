import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import { TextBlock } from '../components/TextBlock';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { Map } from '../components/map/Map';

export const ServicesPageTemplate = ({ title, ...props }) => {
    return (
        <ParallaxGroup>
            <BaseParallax variant="base">
                <TextBlock
                    title={title}
                    description="Proin vel ante placerat velit eleifend dignissim blandit nec tortor. Mauris ut tellus lobortis,
                        mattis leo non, laoreet arcu. Nunc nec mi vitae nisi rutrum pretium."
                    subheading="Our Services"
                />
            </BaseParallax>
            <StyledHeroBackground variant="back">
                <Map />
            </StyledHeroBackground>
        </ParallaxGroup>
    );
};

const BaseParallax = styled(ParallaxLayer)`
    color: black;
`;

const StyledHeroBackground = styled(ParallaxLayer)`
    height: 110%;
    top: 26%;
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
