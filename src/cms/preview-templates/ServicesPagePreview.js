import React from 'react';
import PropTypes from 'prop-types';

import { ServicesPageTemplate } from '../../templates/services-page';

const ServicesPagePreview = ({ entry }) => {
    return (
        <ServicesPageTemplate
            pageName={entry.getIn(['data', 'pageName'])}
            heading={entry.getIn(['data', 'heading'])}
            subheading={entry.getIn(['data', 'subheading'])}
            description={entry.getIn(['data', 'description'])}
        />
    );
};

ServicesPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default ServicesPagePreview;
