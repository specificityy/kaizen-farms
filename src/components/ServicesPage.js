import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ServicesPageTemplate } from '../templates/services-page';

export const ServicesPage = () => <ServicesPageTemplate {...useServices()} />;

const useServices = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
                    frontmatter {
                        title
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2000, quality: 90) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        services {
                            title
                            description
                            image {
                                childImageSharp {
                                    fluid(maxWidth: 1500, quality: 90) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    ).markdownRemark.frontmatter;
};
