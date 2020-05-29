import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ProductsPageTemplate } from '../templates/products-page';

export const ProductsPage = props => <ProductsPageTemplate {...useProducts()} {...props} />;

const useProducts = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "products-page" } }) {
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
        `
    ).markdownRemark.frontmatter;
};
