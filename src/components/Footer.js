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
                        pageName
                        description
                        socialMediaHeading
                        instagramLink
                        facebookLink
                        twitterLink
                        linkedinLink
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
