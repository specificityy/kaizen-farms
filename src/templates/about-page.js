import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Typography } from 'antd';

import { Container } from '../components/Container';
import Layout from '../components/Layout';
import { TitleAndContent } from '../components/TitleAndContent';

const { Text } = Typography;

export const AboutPageTemplate = ({ title, description, image }) => {
    return (
        <Container renderInnerWrapper>
            <TitleAndContent
                title={({ className }) => (
                    <LeftSide className={className}>
                        <Title>{title}</Title>
                    </LeftSide>
                )}
            >
                <StyledDescription>
                    <p>{description}</p>
                </StyledDescription>
            </TitleAndContent>
        </Container>
    );
};

const LeftSide = styled.div`
    padding: 1rem 2rem;
    height: fit-content;
`;
const Title = styled.h1`
    color: white;
`;

const StyledDescription = styled.div`
    color: white;
    max-width: 800px;
    display: inline-block;
    font-size: 1.5rem;

    position: absolute;
    top: 25%;
    transform: translateY(-50%);
`;

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
