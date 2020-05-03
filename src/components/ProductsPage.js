import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import { PreviewCompatibleBackgroundImage } from './PreviewCompatibleBackgroundImage';

export const ProductsPage = () => {
    const { title, image, products } = useProducts();
    console.log(title, image, products);
    return (
        <StyledSection>
            <StyledText>
                <StyledTitle>{title}</StyledTitle>
                {/* <StyledCaption>{caption}</StyledCaption> */}
            </StyledText>

            <StyledHero>
                <StyledBackground imageInfo={image} />
            </StyledHero>
        </StyledSection>
    );
};

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

const StyledSection = styled.section`
    width: 100%;
    height: 100vh;
    filter: opacity(1);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledTitle = styled.h1`
    color: #fff;
    font-size: 6rem;
    font-weight: 100;
`;

const StyledCaption = styled.div`
    color: #fff;
    font-size: 2rem;
    width: 350px;
`;

const StyledText = styled.div`
    background: rgba(25, 25, 25, 0.4);
    width: fit-content;
    padding: 1rem 2rem;
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
