import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import kebabCase from 'lodash/kebabCase';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { TextBlock } from '../components/TextBlock';
import { Hexagon } from '../components/Hexagon';
import theme from '../components/theme';

export const ProductsPageTemplate = ({ pageName, heading, subheading, description, products, backgroundProducts }) => {
    const page = useRef(null);
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        if (!page.current) return;

        const options = {
            rootMargin: '0px',
            threshold: 0.2,
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setReveal(true);
                    observer.disconnect();
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        observer.observe(page.current);
    }, [page]);

    return (
        <ThemeProvider theme={theme}>
            <MainParallaxGroup name="prod-main-parallax-group" id={kebabCase(pageName)}>
                <ProductsLayer variant="base" name="text-and-products-parallax-layer">
                    <TextBlock
                        name="text-wrapper"
                        heading={heading}
                        subheading={subheading}
                        description={description}
                    />
                    <ProdList ref={page} name="products-grid">
                        {products.map(({ title, image }) => (
                            <Product key={title} reveal={reveal} name={title}>
                                <ProdImage imageInfo={image} />
                            </Product>
                        ))}
                    </ProdList>
                </ProductsLayer>
                <HeroBackgroundLayer name="products-hero-background" variant="back">
                    <OverlayShade />
                    <BackgroundImage imageInfo={backgroundProducts} />
                </HeroBackgroundLayer>
            </MainParallaxGroup>
        </ThemeProvider>
    );
};

const MainParallaxGroup = styled(ParallaxGroup)`
    height: 200vh;
    min-height: 2000px;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        min-height: 1700px;
    }
`;

const ProductsLayer = styled(ParallaxLayer)`
    height: max-content;
    min-height: 1600px;
    color: black;
    padding-bottom: 10rem;
    background: white;
    display: flex;
    align-items: center;
    @media (${({ theme }) => theme.mediaQueries.l}) {
        display: block;
        padding-bottom: 3rem;
        min-height: 440px;
    }
`;

const HeroBackgroundLayer = styled(ParallaxLayer)`
    top: 50%;
`;

const BackgroundImage = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const OverlayShade = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(20, 25, 30, 0.3);
`;

const ProdList = styled.ul`
    width: 100%;
    height: fit-content;
    max-width: 1450px;
    margin: 100px 50px 100px 0;
    padding: 20px 2% 55px 2%;
    overflow: hidden;
    background: white;
    flex: 1 0 60%;
    @media (${({ theme }) => theme.mediaQueries.l}) {
        width: 90%;
        margin: 0 auto;
    }
`;

const Product = styled(Hexagon)`
    box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14),
        0px 7px 34px 6px rgba(0, 0, 0, 0.12);
`;

const ProdImage = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: 50% 60%;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 5px;
`;

const ProductsPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;
    return <ProductsPageTemplate {...frontmatter} />;
};

export const productsPageQuery = graphql`
    query ProductsPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                pageName
                heading
                subheading
                description
                backgroundProducts {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 50) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                products {
                    title
                    image {
                        childImageSharp {
                            fluid(maxWidth: 500, quality: 30) {
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
    pageName: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    products: PropTypes.array,
    backgroundProducts: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ProductsPage;
