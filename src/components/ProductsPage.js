import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ProductsPageTemplate } from '../templates/products-page';

export const ProductsPage = () => <ProductsPageTemplate {...useProducts()} />;

const useProducts = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "products-page" } }) {
                    frontmatter {
                        title
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2000, quality: 80) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        products {
                            title
                            description
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
        `
    ).markdownRemark.frontmatter;
};
