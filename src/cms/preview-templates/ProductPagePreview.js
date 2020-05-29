import React from 'react';
import PropTypes from 'prop-types';
import { ProductsPageTemplate } from '../../templates/products-page';

const ProductPagePreview = ({ entry, getAsset }) => {
    const entryProducts = entry.getIn(['data', 'products']);
    const products = entryProducts ? entryProducts.toJS() : [];

    return (
        <ProductsPageTemplate
            heading={entry.getIn(['data', 'heading'])}
            suubheading={entry.getIn(['data', 'suubheading'])}
            description={entry.getIn(['data', 'description'])}
            products={products}
            image={getAsset(entry.getIn(['data', 'image']))}
        />
    );
};

ProductPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
};

export default ProductPagePreview;
