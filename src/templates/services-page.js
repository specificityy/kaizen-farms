import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Card, Space } from 'antd';

import { Container } from '../components/Container';
import { PreviewCompatibleImage } from '../components/PreviewCompatibleImage';
import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';

import Layout from '../components/Layout';

export const ServicesPageTemplate = ({ title, image, services }) => {
    return (
        <Container>
            <StyledSection>
                <StyledTextWrapper>
                    <StyledTitle>{title}</StyledTitle>
                </StyledTextWrapper>

                <StyledHero>
                    <StyledBackground imageInfo={image} />
                </StyledHero>

                <StyledList>
                    {services.map(({ title, description, image }) => (
                        <Card
                            key={title}
                            style={{ width: 300, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 10px 60px 0px' }}
                            cover={<PreviewCompatibleImage imageInfo={image} />}
                        >
                            <Card.Meta title={title} description={description} />
                        </Card>
                    ))}
                </StyledList>
            </StyledSection>
        </Container>
    );
};

const StyledSection = styled.section`
    width: 100%;
    height: 100vh;
    filter: opacity(1);
`;

const StyledTextWrapper = styled.div`
    background: rgba(25, 25, 25, 0.4);
    width: fit-content;
    padding: 1rem 2rem;
    margin: auto;
    margin-bottom: 3rem;
`;

const StyledTitle = styled.h1`
    color: #fff;
    font-size: 3rem;
    font-weight: 100;
`;

const HEADER_HEIGHT = '64px';
const StyledHero = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -10;
    top: -${HEADER_HEIGHT};
    left: 0;
`;

const StyledBackground = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const StyledBackgroundShade = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: -${HEADER_HEIGHT};
    z-index: -10;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    background: #134e5e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right top,
        #f7f8f8,
        #d3ece6,
        #b8dec9,
        #abcea2,
        #acbb78
    ); /* Chrome 10-25, Safari 5.1-6 */
    background-image: linear-gradient(
        to right top,
        #f7f8f8,
        #d3ece6,
        #b8dec9,
        #abcea2,
        #acbb78
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const StyledList = styled(Space)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & > * {
        margin-bottom: 3rem;
    }
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
