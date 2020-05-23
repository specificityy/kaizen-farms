import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Container } from '../components/Container';

export const Parallax = styled.main`
    perspective: 1px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    perspective-origin-x: 100%;
`;

export const ParallaxGroup = styled.div`
    position: relative;
    height: 100vh;
    transform-style: preserve-3d;
`;

export const ParallaxLayer = ({ variant, ...props }) => {
    const Layer = StyledParallaxLayer(variant);

    return <Layer {...props} />;
};

const StyledParallaxLayer = variant => styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform-origin-x: 100%;
    transform: ${layerVariants[variant]};
`;

// scale = 1 + (translateZ * -1) / perspective
const layerVariants = {
    base: 'translateZ(0);',
    back: 'translateZ(-0.25px) scale(1.25);',
    deep: 'translateZ(-0.5px) scale(1.5);',
};

ParallaxLayer.propTypes = {
    variant: PropTypes.oneOf(['base', 'back', 'deep']),
};
