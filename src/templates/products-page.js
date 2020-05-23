import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import chunk from 'lodash/chunk';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import farmPath from '../img/farm-path.jpg';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';

const COLS = 3;
const ROWS = 18;

const rowSpanOptions = [2, 3, 4, 5];

export const ProductsPageTemplate = React.forwardRef(({ title, image, products, className, ...props }, ref) => {
    const productCols = chunk(products, COLS);

    if (productCols.length === COLS + 1) {
        productCols[COLS - 1] = productCols[COLS - 1].concat(productCols[COLS]);
        productCols.length = COLS;
    }

    return (
        <>
            <MainParallaxGroup>
                <BaseParallax variant="back">
                    <BaseText>
                        <SubHeading>{title}</SubHeading>
                        <Title>
                            What we Produce<Dot>.</Dot>
                        </Title>
                        <Description>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis, neque sit amet
                            dapibus varius, risus ipsum sagittis elit, a venenatis enim metus eu neque.
                        </Description>
                    </BaseText>
                    <ProdList>{productCols.map(mapProductToStyledComponent)}</ProdList>
                </BaseParallax>
            </MainParallaxGroup>
            <StyledBackgroundParallaxGroup>
                <StyledHeroBackground variant="deep" />
            </StyledBackgroundParallaxGroup>
        </>
    );
});

const MainParallaxGroup = styled(ParallaxGroup)``;

const BaseParallax = styled(ParallaxLayer)`
    color: black;
    padding-bottom: 20rem;
    background: white;
`;

const BaseText = styled.div`
    padding: 1rem 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 7rem 4rem 12rem 4rem;
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
    background: rgba(25, 25, 25, 0.4);
    color: #fff;
    padding: 5px 10px;
`;

const StyledBackgroundParallaxGroup = styled(ParallaxGroup)`
    z-index: -10;
    height: 90vh;
    top: 20%;
`;

const StyledHeroBackground = styled(ParallaxLayer)`
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

const Dot = styled.span`
    font-weight: bold;
    color: crimson;
`;

const ProductsPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return <ProductsPageTemplate title={frontmatter.title} products={frontmatter.products} image={frontmatter.image} />;
};

export const productsPageQuery = graphql`
    query ProductsPage($id: String!) {
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
