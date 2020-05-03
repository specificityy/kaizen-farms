import React from 'react';
import PropTypes from 'prop-types';
import { ProductPageTemplate } from '../../templates/product-page';

const ProductPagePreview = ({ entry }) => {
    const entryProducts = entry.getIn(['data', 'products']);
    const products = entryProducts ? entryProducts.toJS() : [];

    return <ProductPageTemplate title={entry.getIn(['data', 'title'])} products={products} />;
};

ProductPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default ProductPagePreview;
