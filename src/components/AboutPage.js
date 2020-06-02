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
                        pageName
                        heading
                        subheading
                        description
                        backgroundAbout {
                            childImageSharp {
                                fluid(maxWidth: 2000, quality: 50) {
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
