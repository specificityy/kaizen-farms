import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { PreviewCompatibleBackgroundImage } from './PreviewCompatibleBackgroundImage';

export const HomePage = ({ title, caption, image }) => {
    return (
        <StyledSection>
            <StyledText>
                <StyledTitle>{title}</StyledTitle>
                <StyledCaption>{caption}</StyledCaption>
            </StyledText>

            <StyledHero>
                <StyledBackground imageInfo={image} />
            </StyledHero>
        </StyledSection>
    );
};

const HEADER_HEIGHT = '64px';
const StyledHero = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -10;
    top: -${HEADER_HEIGHT};
    left: 0;
`;

const StyledBackground = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const StyledSection = styled.section`
    width: 100%;
    height: 100vh;
    filter: opacity(1);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledTitle = styled.h1`
    color: #fff;
    font-size: 6rem;
    font-weight: 100;
`;

const StyledCaption = styled.div`
    color: #fff;
    font-size: 2rem;
    width: 350px;
`;

const StyledText = styled.div`
    background: rgba(25, 25, 25, 0.4);
    width: fit-content;
    padding: 1rem 2rem;
`;

HomePage.propTypes = {
    title: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
