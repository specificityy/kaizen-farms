import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Space } from 'antd';

import { Container } from '../components/Container';
import { PreviewCompatibleImage } from '../components/PreviewCompatibleImage';

import Layout from '../components/Layout';

export const ProductsPageTemplate = ({ title, image, products }) => {
    return (
        <Container>
            <StyledSection>
                <StyledTitle>{title}</StyledTitle>

                <StyledList>
                    {products.map(({ title, description, image }) => (
                        <StyledProduct key={title}>
                            <PreviewCompatibleImage
                                imageInfo={image}
                                style={{ width: '300px', filter: 'grayscale(0.4)' }}
                            />
                            <StyledProductTitle>{title}</StyledProductTitle>
                        </StyledProduct>
                    ))}
                </StyledList>
            </StyledSection>
        </Container>
    );
};

const StyledSection = styled.section``;

const StyledTitle = styled.h1`
    width: fit-content;
    margin: auto;
    font-size: 3rem;
    font-weight: 100;
    margin-bottom: 3rem;
`;

const HEADER_HEIGHT = '64px';
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
    justify-content: space-evenly;
    & > * {
        max-width: 90vw;
        margin-bottom: 3rem;
    }
`;

const StyledProduct = styled.div`
    border: none;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 60px 0px;
    padding: 15px;
    width: 400px;
    height: 400px;
    border-radius: 5px;
`;

const StyledProductTitle = styled.h3`
    font-size: 1.5rem;
    margin-top: 20px;
`;

const ProductsPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <ProductsPageTemplate title={frontmatter.title} products={frontmatter.products} image={frontmatter.image} />
        </Layout>
    );
};

export const productsPageQuery = graphql`
    query ProductsPage($id: String!) {
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
                products {
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

ProductsPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

ProductsPageTemplate.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ProductsPage;
