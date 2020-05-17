import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ServicesPageTemplate } from '../templates/services-page';

export const ServicesPage = React.forwardRef((props, ref) => (
    <ServicesPageTemplate {...useServices()} {...props} ref={ref} />
));

const useServices = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
                    frontmatter {
                        title
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
