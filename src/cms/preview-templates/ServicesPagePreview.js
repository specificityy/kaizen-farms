import React from 'react';
import PropTypes from 'prop-types';
import { ServicesPageTemplate } from '../../templates/services-page';

const ServicesPagePreview = ({ entry, getAsset }) => {
    const entryProducts = entry.getIn(['data', 'services']);
    const services = entryProducts ? entryProducts.toJS() : [];

    return (
        <ServicesPageTemplate
            title={entry.getIn(['data', 'title'])}
            services={services}
            image={getAsset(entry.getIn(['data', 'image']))}
        />
    );
};

ServicesPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
};

export default ServicesPagePreview;
