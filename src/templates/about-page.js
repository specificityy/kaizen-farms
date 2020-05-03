import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Container } from '../components/Container';
import Layout from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';

export const AboutPageTemplate = ({ title, description, image }) => {
    return (
        <Container>
            <HomePage {...{ title, description, image }} />
            <ProductsPage />
        </Container>
    );
};

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const AboutPage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <AboutPageTemplate
                title={post.frontmatter.title}
                description={post.frontmatter.description}
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
                description
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
