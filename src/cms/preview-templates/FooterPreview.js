import React from 'react';
import PropTypes from 'prop-types';
import { FooterTemplate } from '../../templates/footer';

const FooterPreview = ({ entry }) => {
    const entryTelephones = entry.getIn(['data', 'telephones']);
    const telephones = entryTelephones ? entryTelephones.toJS() : [];

    return (
        <FooterTemplate
            description={entry.getIn(['data', 'description'])}
            socialMediaHeading={entry.getIn(['data', 'socialMediaHeading'])}
            instagramLink={entry.getIn(['data', 'instagramLink'])}
            facebookLink={entry.getIn(['data', 'facebookLink'])}
            twitterLink={entry.getIn(['data', 'twitterLink'])}
            linkedinLink={entry.getIn(['data', 'linkedinLink'])}
            contactHeading={entry.getIn(['data', 'contactHeading'])}
            email={entry.getIn(['data', 'email'])}
            telephones={telephones}
        />
    );
};

FooterPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default FooterPreview;
