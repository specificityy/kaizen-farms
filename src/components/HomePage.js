import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import { PreviewCompatibleBackgroundImage } from './PreviewCompatibleBackgroundImage';

export const HomePage = () => {
    const { title, description, image } = useHomepage();
    return (
        <StyledSection>
            <StyledTextWrapper>
                <StyledTitle>{title}</StyledTitle>
                <StyledCaption>{description}</StyledCaption>
            </StyledTextWrapper>

            <StyledHero>
                <StyledBackground imageInfo={image} />
            </StyledHero>
        </StyledSection>
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
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const useHomepage = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
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
        `
    ).markdownRemark.frontmatter;
};
