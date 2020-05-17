import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { HomePageTemplate } from '../templates/home-page';

export const HomePage = React.forwardRef((props, ref) => <HomePageTemplate {...useHomepage()} {...props} ref={ref} />);

const useHomepage = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
                    frontmatter {
                        title
                        description
                    }
                }
            }
        `
    ).markdownRemark.frontmatter;
};
