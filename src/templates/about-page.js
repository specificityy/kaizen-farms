import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Layout from '../components/Layout';
import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';

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
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const StyledSection = styled.section`
    width: 100%;
    height: 100vh;
    filter: opacity(1);
    display: flex;
    flex-direction: column;
    justify-content: center;
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

const StyledText = styled.div`
    background: rgba(25, 25, 25, 0.4);
    width: fit-content;
    padding: 1rem 2rem;
`;

export const AboutPageTemplate = ({ title, caption, image }) => {
    return (
        <StyledSection className="section section--gradient">
            <StyledText>
                <StyledTitle>{title}</StyledTitle>
                <StyledCaption>{caption}</StyledCaption>
            </StyledText>

            <StyledHero>
                <StyledBackground imageInfo={image} />
            </StyledHero>
        </StyledSection>
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
