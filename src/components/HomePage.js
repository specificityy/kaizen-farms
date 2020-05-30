import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { HomePageTemplate } from '../templates/home-page';

export const HomePage = props => <HomePageTemplate {...useHomepage()} {...props} />;

const useHomepage = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
                    frontmatter {
                        heading
                        description
                        imageHome {
                            childImageSharp {
                                fluid(maxWidth: 2000, quality: 100) {
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
