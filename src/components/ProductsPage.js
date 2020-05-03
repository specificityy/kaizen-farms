import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { Card, Space } from 'antd';

import { Container } from './Container';
import { PreviewCompatibleBackgroundImage } from './PreviewCompatibleBackgroundImage';
import { PreviewCompatibleImage } from './PreviewCompatibleImage';

export const ProductsPage = () => {
    const { title, image, products } = useProducts();
    console.log(title, image, products);
    return (
        <Container>
            <StyledSection>
                <StyledTextWrapper>
                    <StyledTitle>{title}</StyledTitle>
                </StyledTextWrapper>

                <StyledBackgroundShade />
                {/* <StyledHero>
                <StyledBackground imageInfo={image} />
            </StyledHero> */}

                <StyledList>
                    {products.map(({ title, caption, image }) => (
                        <Card style={{ width: 300 }} cover={<PreviewCompatibleImage imageInfo={image} />}>
                            <Card.Meta title={title} description={caption} />
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
    filter: opacity(0.5) contrast(0.5);
`;

const StyledBackground = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    top: -${HEADER_HEIGHT};
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    background: #134e5e; /* fallback for old browsers */
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
    justify-content: flex-end;
    & > * {
        flex: 0 0 40%;
        margin-bottom: 3rem;
        width: 300px;
    }
`;

const useProducts = () => {
    return useStaticQuery(
        graphql`
            {
                allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "product-page" } } }) {
                    totalCount
                    edges {
                        node {
                            frontmatter {
                                title
                                image {
                                    childImageSharp {
                                        fluid(maxWidth: 4000, quality: 80) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                                products {
                                    title
                                    caption
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
                }
            }
        `
    ).allMarkdownRemark.edges[0].node.frontmatter;
};
