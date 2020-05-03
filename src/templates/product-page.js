import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

// import { PreviewCompatibleImage } from '../components/PreviewCompatibleImage';

export const ProductPageTemplate = ({ title, products }) => {
    console.log({ title, products });
    return (
        <div className="content">
            <h2
                className="has-text-weight-bold is-size-1"
                style={{
                    boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
                    backgroundColor: '#f40',
                    color: 'white',
                    padding: '1rem',
                }}
            >
                {title}
            </h2>
        </div>
    );
};

ProductPageTemplate.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array,
};

const ProductPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <ProductPageTemplate title={frontmatter.title} products={frontmatter.products} />
        </Layout>
    );
};

ProductPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

export default ProductPage;

export const productPageQuery = graphql`
    query ProductPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 540, quality: 80) {
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
`;
