import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import worldMap from '../img/world-map.jpg';
import { TitleAndContent } from '../components/TitleAndContent';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { Map } from '../components/map/Map';

export const ServicesPageTemplate = React.forwardRef(({ title, ...props }, ref) => {
    return (
        <ParallaxGroup>
            <BaseParallax variant="base">
                <BaseText>
                    <SubHeading>Our Services</SubHeading>
                    <Title>{title}</Title>
                    <Description>
                        Proin vel ante placerat velit eleifend dignissim blandit nec tortor. Mauris ut tellus lobortis,
                        mattis leo non, laoreet arcu. Nunc nec mi vitae nisi rutrum pretium.
                    </Description>
                </BaseText>
            </BaseParallax>
            <StyledHeroBackground variant="back">
                <Map />
            </StyledHeroBackground>
        </ParallaxGroup>
    );
});

const BaseParallax = styled(ParallaxLayer)`
    color: black;
`;

const BaseText = styled.div`
    background: white;
    padding: 1rem 2rem;
    width: 100%;
    min-height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 4rem;
`;

const SubHeading = styled.p`
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
