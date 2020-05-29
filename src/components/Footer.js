import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { FooterTemplate } from '../templates/footer';

export const Footer = () => <FooterTemplate {...useFooter()} />;

const useFooter = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "footer" } }) {
                    frontmatter {
                        heading
                        description
                        instagramHeading
                        instagramLink
                        contactHeading
                        email
                        telephones {
                            number
                        }
                    }
                }
            }
        `
    ).markdownRemark.frontmatter;
};
