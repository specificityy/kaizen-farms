import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Container } from '../components/Container';
import Layout from '../components/Layout';
import { HomePage as HM } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';

export const HomePageTemplate = ({ title, description, image }) => {
    return (
        <Container>
            <HM />
            <ProductsPage />
        </Container>
    );
};

HomePageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const HomePage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <HomePageTemplate
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                image={post.frontmatter.image}
            />
        </Layout>
    );
};

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HomePage;

export const homePageQuery = graphql`
    query HomePage($id: String!) {
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
