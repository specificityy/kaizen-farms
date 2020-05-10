import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';

export const RevealingText = React.memo(({ component, hiddenChars }) => {
    const Styled = withStyles(true);
    const text = component.props.children;

    console.log(hiddenChars);

    const children = text.split('').map((letter, index) => (
        <span key={index} style={{ visibility: index < hiddenChars ? 'hidden' : 'visible' }}>
            {letter}
        </span>
    ));

    return <Styled>{React.cloneElement(component, { children })}</Styled>;
});

const withStyles = show => styled.span`
    & > * {
        position: relative;
        overflow: hidden;
        ::before {
            content: '';
            width: 100%;
            height: 100%;
            background: #1c1c1c;
            position: absolute;
            left: -100%;
        }
    }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

RevealingText.propTypes = {
    component: PropTypes.any,
    hiddenChars: PropTypes.number,
};
