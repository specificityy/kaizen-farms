import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ProductsPageTemplate } from '../templates/products-page';

export const ProductsPage = React.forwardRef((props, ref) => (
    <ProductsPageTemplate {...useProducts()} {...props} ref={ref} />
));

const useProducts = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "products-page" } }) {
                    frontmatter {
                        title
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
