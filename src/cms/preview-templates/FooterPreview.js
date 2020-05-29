import React from 'react';
import PropTypes from 'prop-types';
import { FooterTemplate } from '../../templates/footer';

const FooterPreview = ({ entry }) => {
    return (
        <FooterTemplate
            heading={entry.getIn(['data', 'heading'])}
            description={entry.getIn(['data', 'description'])}
            instagramHeading={entry.getIn(['data', 'instagramHeading'])}
            instagramLink={entry.getIn(['data', 'instagramLink'])}
            contactHeading={entry.getIn(['data', 'contactHeading'])}
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
