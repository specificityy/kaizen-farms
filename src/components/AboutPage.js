import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { AboutPageTemplate } from '../templates/about-page';

export const AboutPage = () => <AboutPageTemplate {...useAboutData()} />;

const useAboutData = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
                    frontmatter {
                        title
                        description
                        image {
                            childImageSharp {
                                fluid(maxWidth: 3000, quality: 100) {
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
