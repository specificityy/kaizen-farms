import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Container } from '../components/Container';
import Layout from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';

export const AboutPageTemplate = ({ title, caption, image }) => {
    return (
        <Container>
            <HomePage {...{ title, caption, image }} />
            <ProductsPage />
        </Container>
    );
};

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const AboutPage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <AboutPageTemplate
                title={post.frontmatter.title}
                caption={post.frontmatter.caption}
                image={post.frontmatter.image}
            />
        </Layout>
    );
};

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                caption
                image {
                    childImageSharp {
                        fluid(maxWidth: 3922, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
