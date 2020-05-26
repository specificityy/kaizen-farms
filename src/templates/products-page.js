import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import chunk from 'lodash/chunk';
import throttle from 'lodash/throttle';
import Measure from 'react-measure';
import { ThemeProvider } from 'emotion-theming';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import farmPath from '../img/farm-path.jpg';
import vegetables from '../img/vegetables-plants.jpg';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { TextBlock } from '../components/TextBlock';
import { Hexagon, Hexagon1 } from '../components/Hexagon';
import theme from '../components/theme';

const COLS = 3;
const ROWS = 20;

const rowSpanOptions = [3, 3, 4, 5, 6];

let prevRatio = 0;

export const ProductsPageTemplate = ({ title, image, products, className }) => {
    const page = useRef(null);
    const productsRef = useRef(null);
    const [reveal, setReveal] = useState(true);

    // useEffect(() => {
    //     if (!page.current) return;

    //     const options = {
    //         // root: page.current,
    //         rootMargin: '0px',
    //         threshold: [0.25, 0.5, 1],
    //     };

    //     const callback = (entries, observer) => {
    //         // console.log(entries);
    //         entries.forEach(entry => {
    //             // console.log(entry);
    //             // Each entry describes an intersection change for one observed
    //             // target element:
    //             //   entry.boundingClientRect
    //             //   entry.intersectionRatio
    //             //   entry.intersectionRect
    //             //   entry.isIntersecting
    //             //   entry.rootBounds
    //             //   entry.target
    //             //   entry.time
    //             if (entry.intersectionRatio > 0.8) {
    //                 console.log(entry);
    //                 setReveal(true);
    //             } else {
    //                 console.log('below');
    //                 setReveal(false);
    //             }

    //             // prevRatio = entry.intersectionRatio;
    //         });
    //     };

    //     const observer = new IntersectionObserver(callback, options);

    //     observer.observe(page.current);
    // }, [page.current]);

    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="prod-main-parallax-group" id="products">
                <ProductsLayer variant="base" name="text-and-products-parallax-layer">
                    <StyledTextBlock
                        name="text-wrapper"
                        title="What we produce"
                        subheading={title}
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis, neque sit amet
                            dapibus varius, risus ipsum sagittis elit, a venenatis enim metus eu neque."
                    />
                    <ProdList ref={page} name="products-grid" id="hex-grid">
                        {products.map(({ title, description, image }) => {
                            return (
                                <Product key={title} reveal={reveal} name={title}>
                                    {/* <ProductsImage
                                    className="overlay"
                                    hide={reveal}
                                    src={image.childImageSharp.fluid.src}
                                /> */}
                                    <ProdImage imageInfo={image} />
                                </Product>
                            );
                        })}
                    </ProdList>
                </ProductsLayer>
                <HeroBackgroundLayer variant="back" />
            </MainParallaxGroup>
        </ThemeProvider>
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
    align-items: center;
    @media (${({ theme }) => theme.mediaQueries.l}) {
        height: fit-content;
        display: block;
        padding-bottom: 3rem;
    }
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

const StyledTextBlock = styled(TextBlock)``;

const ProdList = styled.ul`
    width: 100%;
    height: fit-content;
    max-width: 1450px;
    margin: 100px 50px 100px 0;
    padding: 20px 2%;
    overflow: hidden;
    background: white;
    flex: 1 0 60%;
    @media (${({ theme }) => theme.mediaQueries.l}) {
        width: 90%;
        margin: 0 auto;
    }
`;

const Product = styled(Hexagon)``;

const ProdImage = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: 50% 60%;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 5px;
`;

const ProductsImage = styled.div`
    ${props => `
        background: url(${props.src});
        background-position: 50% 60%;
        background-repeat: no-repeat;
        background-size: cover;
        padding: 5px;

        transition: all 700ms;

        &::before {
            content: '';
            position: fixed;
            z-index: 10;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(${vegetables});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: fixed;
            opacity: ${props.hide ? '0' : '1'};
        }`}
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
