import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import { Container } from '../components/Container';
import worldMap from '../img/world-map.jpg';

import Layout from '../components/Layout';

export const ServicesPageTemplate = ({ title }) => {
    return (
        <Container renderInnerWrapper>
            <StyledSection>
                <StyledTitle>{title}</StyledTitle>
                <StyledBackgroundWrapper>
                    <StyledBackground />
                </StyledBackgroundWrapper>
            </StyledSection>
        </Container>
    );
};

const StyledSection = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledTitle = styled.h1`
    font-size: 3rem;
    font-weight: 100;
    flex: 0 1 auto;
    margin-right: 50px;
`;

const StyledBackgroundWrapper = styled.div`
    flex: 1 0 80%;
`;

const StyledBackground = styled.div`
    height: 800px;
    background: url(${worldMap});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`;

const ServicesPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <ServicesPageTemplate title={frontmatter.title} services={frontmatter.services} image={frontmatter.image} />
        </Layout>
    );
};

export const servicesPageQuery = graphql`
    query ServicesPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 540, quality: 80) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                services {
                    title
                    description
                    image {
                        childImageSharp {
                            fluid(maxWidth: 540, quality: 80) {
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
