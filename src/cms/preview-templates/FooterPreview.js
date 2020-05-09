import React from 'react';
import PropTypes from 'prop-types';
import { FooterTemplate } from '../../templates/footer';

const FooterPreview = ({ entry }) => {
    return (
        <FooterTemplate
            instagram={entry.getIn(['data', 'instagram'])}
            email={entry.getIn(['data', 'email'])}
            telephones={entry.getIn(['data', 'telephones'])}
        />
    );
};

FooterPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default FooterPreview;
