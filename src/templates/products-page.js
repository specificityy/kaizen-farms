import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Card, Space } from 'antd';

import { Container } from '../components/Container';
import { PreviewCompatibleImage } from '../components/PreviewCompatibleImage';

import Layout from '../components/Layout';

export const ProductsPageTemplate = ({ title, image, products }) => {
    console.log(title, image, products);
    return (
        <Container>
            <StyledSection>
                <StyledTextWrapper>
                    <StyledTitle>{title}</StyledTitle>
                </StyledTextWrapper>

                <StyledBackgroundShade />

                <StyledList>
                    {products.map(({ title, description, image }) => (
                        <Card key={title} style={{ width: 300 }} cover={<PreviewCompatibleImage imageInfo={image} />}>
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

const ProductsPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <ProductsPageTemplate title={frontmatter.title} products={frontmatter.products} image={frontmatter.image} />
        </Layout>
    );
};

export const productPageQuery = graphql`
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
