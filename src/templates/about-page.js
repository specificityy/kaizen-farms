import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Container } from '../components/Container';
import Layout from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';

export const AboutPageTemplate = ({ title, description, image, mission, vision }) => {
    console.log({ image, vision, mission });
    return (
        <Container>
            <div>{title}</div>
            <div>{description}</div>
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
            frontmatter {
                title
                description
                mission {
                    title
                    description
                }
                vision {
                    title
                    description
                }
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
