import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import { Container } from '../components/Container';
import Layout from '../components/Layout';
import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';

export const HomePageTemplate = ({ title, description, image }) => {
    return (
        <Container>
            <StyledSection>
                <StyledTextWrapper>
                    <StyledTitle>{title}</StyledTitle>
                    <StyledCaption>{description}</StyledCaption>
                </StyledTextWrapper>

                <StyledHero>
                    <StyledBackground imageInfo={image} style={{ backgroundPositionY: 'top', 'min-width': '2000px' }} />
                </StyledHero>
            </StyledSection>
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

const StyledSection = styled.section`
    width: 100%;
    height: 100vh;
    filter: opacity(1);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledTextWrapper = styled.div`
    background: rgba(25, 25, 25, 0.4);
    width: fit-content;
    padding: 1rem 2rem;
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
    background-position: 50% 60%;
    background-repeat: no-repeat;
    background-size: cover;
`;

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
