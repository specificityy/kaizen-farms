import React from 'react';
import PropTypes from 'prop-types';
import { ServicesPageTemplate } from '../../templates/services-page';

const ServicesPagePreview = ({ entry }) => {
    const entryBulletPoints = entry.getIn(['data', 'bulletPoints']);
    const bulletPoints = entryBulletPoints ? entryBulletPoints.toJS() : [];

    return (
        <ServicesPageTemplate
            heading={entry.getIn(['data', 'heading'])}
            subheading={entry.getIn(['data', 'subheading'])}
            description={entry.getIn(['data', 'description'])}
            bulletPoints={bulletPoints}
        />
    );
};

ServicesPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default ServicesPagePreview;
