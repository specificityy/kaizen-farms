import React from 'react';
import PropTypes from 'prop-types';

import { ProductsPageTemplate } from '../../templates/products-page';

const ProductPagePreview = ({ entry, getAsset }) => {
    const entryProducts = entry.getIn(['data', 'products']);
    const products = entryProducts ? entryProducts.toJS() : [];

    return (
        <ProductsPageTemplate
            pageName={entry.getIn(['data', 'pageName'])}
            heading={entry.getIn(['data', 'heading'])}
            suubheading={entry.getIn(['data', 'subheading'])}
            description={entry.getIn(['data', 'description'])}
            products={products}
            backgroundProducts={getAsset(entry.getIn(['data', 'backgroundProducts']))}
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
