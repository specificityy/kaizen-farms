import React from 'react';
import PropTypes from 'prop-types';
import { ProductsPageTemplate } from '../../templates/products-page';

const ProductPagePreview = ({ entry }) => {
    const entryProducts = entry.getIn(['data', 'products']);
    const products = entryProducts ? entryProducts.toJS() : [];

    return <ProductsPageTemplate title={entry.getIn(['data', 'title'])} products={products} />;
};

ProductPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default ProductPagePreview;
