import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import { TitleAndContent } from '../components/TitleAndContent';

export const AboutPageTemplate = React.forwardRef(({ title, description, image, ...props }, ref) => {
    return (
        <TitleAndContent
            ref={ref}
            {...props}
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
    );
});

const LeftSide = styled.div`
    padding: 1rem 2rem;
    height: fit-content;
`;

const Title = styled.h1`
    color: #1c1c1c;
`;

const StyledDescription = styled.div`
    color: #1c1c1c;
    max-width: 800px;
    display: inline-block;
    font-size: 1.5rem;
    margin: auto;
`;

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const AboutPage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <AboutPageTemplate
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            image={post.frontmatter.image}
        />
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
            }
        }
    }
`;
