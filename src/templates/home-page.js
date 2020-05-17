import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Peppers from '../img/peppers.svg';
import { TitleAndContent } from '../components/TitleAndContent';

export const HomePageTemplate = React.forwardRef(({ title, description, image, className, ...props }, ref) => {
    return (
        <TitleAndContent
            ref={ref}
            {...props}
            className={className}
            title={({ className }) => (
                <LeftSide className={className}>
                    <Title>{title}</Title>
                    <Tagline>{description}</Tagline>
                </LeftSide>
            )}
        >
            <RightSide>
                <Peppers />
            </RightSide>
        </TitleAndContent>
    );
});

HomePageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const HomePage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <HomePageTemplate
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            image={post.frontmatter.image}
        />
    );
};

const LeftSide = styled.div`
    padding: 1rem 2rem;
    height: fit-content;
`;

const Title = styled.h1`
    font-size: 7rem;
    font-weight: 800;
    color: #1c1c1c;
`;

const RightSide = styled.div`
    width: 100%;
    svg {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Tagline = styled.div`
    font-size: 2rem;
`;

// const StyledBackground = styled.div`
//     height: 100%;
//     width: 100%;
//     background: url(${worldMap});
//     background-position: center;
//     background-repeat: no-repeat;
//     background-size: contain;
// `;

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
            }
        }
    }
`;
