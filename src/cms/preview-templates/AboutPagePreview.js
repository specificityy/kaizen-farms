import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../templates/about-page';

const AboutPagePreview = ({ entry, getAsset }) => (
    <AboutPageTemplate
        pageName={entry.getIn(['data', 'pageName'])}
        heading={entry.getIn(['data', 'heading'])}
        subheading={entry.getIn(['data', 'subheading'])}
        description={entry.getIn(['data', 'description'])}
        backgroundAbout={getAsset(entry.getIn(['data', 'backgroundAbout']))}
    />
);

AboutPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
};

export default AboutPagePreview;
