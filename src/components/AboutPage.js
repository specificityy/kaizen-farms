import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { AboutPageTemplate } from '../templates/about-page';

export const AboutPage = React.forwardRef((props, ref) => (
    <AboutPageTemplate {...useAboutData()} {...props} ref={ref} />
));

const useAboutData = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
                    frontmatter {
                        title
                        description
                    }
                }
            }
        `
    ).markdownRemark.frontmatter;
};
