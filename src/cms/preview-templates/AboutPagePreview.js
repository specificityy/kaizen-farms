import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../templates/about-page';

const AboutPagePreview = ({ entry, getAsset }) => (
    <AboutPageTemplate
        heading={entry.getIn(['data', 'heading'])}
        subheading={entry.getIn(['data', 'subheading'])}
        description={entry.getIn(['data', 'description'])}
        imageAbout={getAsset(entry.getIn(['data', 'imageAbout']))}
    />
);

AboutPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
};

export default AboutPagePreview;
