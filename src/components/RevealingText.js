import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const RevealingText = ({ component, percent = -100 }) => {
    console.log(percent - 100);
    const Styled = withStyles(percent - 100);
    return <Styled>{component}</Styled>;
};

const withStyles = percent => styled.span`
    & > * {
        position: relative;
        overflow: hidden;
        ::before {
            content: '';
            width: 100%;
            height: 100%;
            background: #1c1c1c;
            position: absolute;
            left: ${percent}%;
        }
    }
`;

RevealingText.propTypes = {
    component: PropTypes.any,
    percent: PropTypes.number,
};
