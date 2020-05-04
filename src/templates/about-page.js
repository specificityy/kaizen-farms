import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Typography } from 'antd';

import { Container } from '../components/Container';
import Layout from '../components/Layout';

const { Title, Text } = Typography;

export const AboutPageTemplate = ({ title, description, image, mission, vision }) => {
    return (
        <Container>
            <Mission {...mission} />
            <Vision {...vision} />
        </Container>
    );
};

const Mission = ({ title, description }) => {
    return (
        <StyledMission>
            <Title level={2} type="secondary">
                {title}
            </Title>
            <StyledDescription>{description}</StyledDescription>
        </StyledMission>
    );
};

const Vision = ({ title, description }) => (
    <StyledVision>
        <Title level={2} type="secondary">
            {title}
        </Title>
        <StyledDescription>{description}</StyledDescription>
    </StyledVision>
);

const HEADER_HEIGHT = 64;
const StyledMission = styled.div`
    text-align: center;
    padding-top: ${HEADER_HEIGHT}px;
    padding-bottom: ${HEADER_HEIGHT * 2}px;
`;

const StyledVision = styled.section`
    width: 100%;
    filter: opacity(1);
    text-align: center;
    padding-top: ${HEADER_HEIGHT * 2}px;
    padding-bottom: ${HEADER_HEIGHT * 3}px;

    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    background: #134e5e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right top,
        #f7f8f8,
        #d3ece6,
        #b8dec9,
        #abcea2,
        #acbb78
    ); /* Chrome 10-25, Safari 5.1-6 */
    background-image: linear-gradient(
        to right top,
        #f7f8f8,
        #d3ece6,
        #b8dec9,
        #abcea2,
        #acbb78
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const StyledBackgroundShade = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: -${HEADER_HEIGHT};
    z-index: -10;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    background: #134e5e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right top,
        #f7f8f8,
        #d3ece6,
        #b8dec9,
        #abcea2,
        #acbb78
    ); /* Chrome 10-25, Safari 5.1-6 */
    background-image: linear-gradient(
        to right top,
        #f7f8f8,
        #d3ece6,
        #b8dec9,
        #abcea2,
        #acbb78
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const StyledDescription = styled(Text)`
    max-width: 800px;
    display: inline-block;
    font-size: 1.5rem;
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
                mission={post.frontmatter.mission}
                vision={post.frontmatter.vision}
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
