import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import chunk from 'lodash/chunk';

import { Container } from '../components/Container';
import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';

import Layout from '../components/Layout';

const COLS = 3;
const ROWS = 15;

const rowSpanOptions = [2, 3, 4, 5];

export const ProductsPageTemplate = ({ title, image, products }) => {
    const productCols = chunk(products, COLS);

    if (productCols.length === COLS + 1) {
        productCols[COLS - 1] = productCols[COLS - 1].concat(productCols[COLS]);
        productCols.length = COLS;
    }

    return (
        <StyledContainer>
            <StyledTitle>{title}</StyledTitle>

            <StyledList>
                {productCols.map((col, colIndex) => {
                    let rowStart = 1;
                    let cellsLeft = ROWS;

                    return col.map(({ title, description, image }, rowIndex) => {
                        if (rowIndex > 0) rowStart = ROWS - cellsLeft + 1;

                        let rowSpan = rowSpanOptions[Math.floor(Math.random() * COLS + 1)];

                        if (rowIndex === col.length - 1) {
                            rowSpan = cellsLeft;
                        } else if (rowSpan >= cellsLeft) {
                            rowSpan = 1;
                        }

                        cellsLeft -= rowSpan;

                        if (cellsLeft < 1) cellsLeft = ROWS;

                        const Product = StyledProduct(rowSpan, colIndex + 1, rowStart);

                        return (
                            <Product key={title}>
                                <StyledProductBackground imageInfo={image} />
                                <StyledProductTitle>{title}</StyledProductTitle>
                            </Product>
                        );
                    });
                })}
            </StyledList>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
    height: 90vh;
    & > * {
        height: 100%;
    }
`;

const StyledTitle = styled.h1`
    width: fit-content;
    margin: auto;
    font-size: 3rem;
    font-weight: 100;
    margin-bottom: 3rem;
`;

const StyledList = styled.div`
    height: 85%;
    display: grid;
    grid-template-columns: repeat(${COLS}, auto);
    grid-template-rows: repeat(${ROWS}, auto);
    column-gap: 30px;
    row-gap: 30px;
`;

const StyledProduct = (rowSpan, colStart, rowStart) => {
    return styled.div`
        text-align: center;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 25px 0px;

        grid-row: ${rowStart} / span ${rowSpan};
        grid-column-start: ${colStart};
    `;
};

const StyledProductBackground = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: 50% 60%;
    background-repeat: no-repeat;
    background-size: cover;
`;

const StyledProductTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(25, 25, 25, 0.4);
    color: #fff;
    padding: 5px 10px;
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
                        fluid(maxWidth: 1000, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                products {
                    title
                    image {
                        childImageSharp {
                            fluid(maxWidth: 1000, quality: 100) {
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
