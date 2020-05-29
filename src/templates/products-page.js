import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import farmPath from '../img/farm-path.jpg';
import { ParallaxGroup, ParallaxLayer } from '../components/Parallax';
import { TextBlock } from '../components/TextBlock';
import { Hexagon } from '../components/Hexagon';
import theme from '../components/theme';

export const ProductsPageTemplate = ({ heading, subheading, description, products }) => {
    const page = useRef(null);
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        if (!page.current) return;

        const options = {
            rootMargin: '0px',
            threshold: 1,
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0.6) {
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
            <MainParallaxGroup name="prod-main-parallax-group" id="products">
                <ProductsLayer variant="base" name="text-and-products-parallax-layer">
                    <StyledTextBlock
                        name="text-wrapper"
                        heading={heading}
                        subheading={subheading}
                        description={description}
                    />
                    <ProdList ref={page} name="products-grid" id="hex-grid">
                        {products.map(({ title, image }) => {
                            return (
                                <Product key={title} reveal={reveal} name={title}>
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
    min-height: 1800px;
`;

const ProductsLayer = styled(ParallaxLayer)`
    color: black;
    padding-bottom: 10rem;
    background: white;
    height: 100vh;
    display: flex;
    align-items: center;
    min-height: 1600px;
    @media (${({ theme }) => theme.mediaQueries.l}) {
        height: fit-content;
        display: block;
        padding-bottom: 3rem;
        min-height: 440px;
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
                heading
                subheading
                description
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
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    products: PropTypes.array,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ProductsPage;
