import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { HomePageTemplate } from '../templates/home-page';

export const HomePage = () => <HomePageTemplate {...useHomepage()} />;

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
