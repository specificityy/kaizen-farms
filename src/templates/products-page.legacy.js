import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import farmPath from '../img/farm-path.jpg';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { TextBlock } from '../components/TextBlock';
import { Hexagon } from '../components/Hexagon';

const COLS = 3;
const ROWS = 20;

const rowSpanOptions = [3, 3, 4, 5, 6];

export const ProductsPageTemplate = ({ title, image, products, className }) => {
    const productCols = chunk(shuffle(products), COLS);

    if (productCols.length === COLS + 1) {
        productCols[COLS - 1] = productCols[COLS - 1].concat(productCols[COLS]);
        productCols.length = COLS;
    }

    return (
        <>
            <MainParallaxGroup name="prod-main-parallax-group" id="products">
                <ProductsLayer variant="base" name="text-and-products-parallax-layer">
                    <StyledTextBlock
                        name="text-wrapper"
                        title="What we produce"
                        subheading={title}
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis, neque sit amet
                            dapibus varius, risus ipsum sagittis elit, a venenatis enim metus eu neque."
                    />
                    <ProdList name="products-grid">{productCols.map(mapProductToStyledComponent)}</ProdList>
                </ProductsLayer>
                <HeroBackgroundLayer variant="back" />
            </MainParallaxGroup>
        </>
    );
};

const MainParallaxGroup = styled(ParallaxGroup)`
    height: 200vh;
`;

const ProductsLayer = styled(ParallaxLayer)`
    color: black;
    padding-bottom: 10rem;
    background: white;
    height: 100vh;
    display: flex;
`;

const StyledTextBlock = styled(TextBlock)`
    flex: 1 1 35%;
`;

const HeroBackgroundLayer = styled(ParallaxLayer)`
    top: 50%;
    background: url(${farmPath});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &::before {
        content: '';
        display: block;
        background: rgba(20, 25, 30, 0.3);
        height: 100%;
    }
`;

const ProdList = styled.div`
    display: grid;
    grid-template-columns: repeat(${COLS}, auto);
    grid-template-rows: repeat(${ROWS}, auto);
    column-gap: 100px;
    row-gap: 75px;
    height: 80%;
    width: 95%;
    margin: auto;
`;

const Product = (rowSpan, colStart, rowStart) => {
    return styled.div`
        text-align: center;
        position: relative;
        box-shadow: 0 24px 100px 0 rgba(0, 0, 0, 0.41), 0 6px 40px 0 rgba(0, 0, 0, 0.4);

        &:hover {
            box-shadow: 0px 20px 60px -10px rgba(0, 0, 0, 0.3);
        }

        transition: all 300ms;

        grid-row: ${rowStart} / span ${rowSpan};
        grid-column-start: ${colStart};
    `;
};

const ProdImage = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: 50% 60%;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 5px;
`;

const ProdTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(25, 25, 25, 0.7);
    color: #fff;
    padding: 5px 10px;
`;

const StyledBackgroundParallaxGroup = styled(ParallaxGroup)`
    z-index: -10;
    height: 90vh;
    top: 20%;
`;

const ProductsPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return <ProductsPageTemplate title={frontmatter.title} products={frontmatter.products} image={frontmatter.image} />;
};

export const productsPageQuery = graphql`
    query ProductsPageLegacy($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                products {
                    title
                    image {
                        childImageSharp {
                            fluid(maxWidth: 1000, quality: 80) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`;

const mapProductToStyledComponent = (col, colIndex) => {
    let rowStart = 1;
    let cellsLeft = ROWS;

    return col.map(({ title, description, image }, rowIndex) => {
        if (rowIndex > 0) rowStart = ROWS - cellsLeft + 1;

        let rowSpan = rowSpanOptions[Math.floor(Math.random() * rowSpanOptions.length)];

        if (rowIndex === col.length - 1) {
            rowSpan = cellsLeft;
        } else if (rowSpan >= cellsLeft) {
            rowSpan = 1;
        }

        cellsLeft -= rowSpan;

        if (cellsLeft < 1) cellsLeft = ROWS;

        const ProductWithStyles = Product(rowSpan, colIndex + 1, rowStart);

        return (
            <ProductWithStyles key={title}>
                <ProdImage imageInfo={image} />
                <ProdTitle>{title}</ProdTitle>
            </ProductWithStyles>
        );
    });
};

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
