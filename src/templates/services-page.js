import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import worldMap from '../img/world-map.jpg';

import { TitleAndContent } from '../components/TitleAndContent';

export const ServicesPageTemplate = React.forwardRef(({ title, ...props }, ref) => {
    return (
        <TitleAndContent
            ref={ref}
            {...props}
            title={({ className }) => (
                <LeftSide className={className}>
                    <Title>{title}</Title>
                </LeftSide>
            )}
        >
            <StyledBackground />
        </TitleAndContent>
    );
});

const Title = styled.h1`
    color: #1c1c1c;
`;

const LeftSide = styled.div`
    padding: 1rem 2rem;
    height: fit-content;
`;

const StyledBackground = styled.div`
    height: 100%;
    width: 100%;
    background: url(${worldMap});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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
