import React from 'react';
import PropTypes from 'prop-types';
import { HomePageTemplate } from '../../templates/home-page';

const HomePagePreview = ({ entry, getAsset }) => {
    return (
        <HomePageTemplate
            heading={entry.getIn(['data', 'heading'])}
            description={entry.getIn(['data', 'description'])}
            imageHome={getAsset(entry.getIn(['data', 'imageHome']))}
        />
    );
};

HomePagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
};

export default HomePagePreview;
