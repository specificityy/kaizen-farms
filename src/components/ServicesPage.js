import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ServicesPageTemplate } from '../templates/services-page';

export const ServicesPage = props => <ServicesPageTemplate {...useServices()} {...props} />;

const useServices = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
                    frontmatter {
                        pageName
                        heading
                        subheading
                        description
                        bulletPoints {
                            text
                        }
                    }
                }
            }
        `
    ).markdownRemark.frontmatter;
};
