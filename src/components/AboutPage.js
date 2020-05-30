import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { AboutPageTemplate } from '../templates/about-page';

export const AboutPage = props => <AboutPageTemplate {...useAboutData()} {...props} />;

const useAboutData = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
                    frontmatter {
                        heading
                        subheading
                        description
                        imageAbout {
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
