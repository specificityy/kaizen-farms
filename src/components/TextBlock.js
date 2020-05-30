import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const TextBlock = ({ heading, description, subheading, ...props }) => {
    return (
        <Wrapper {...props}>
            <Subheading>{subheading}</Subheading>
            <Heading>
                {heading}
                <Red>.</Red>
            </Heading>
            <Description>{description}</Description>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: white;
    padding: 1rem 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 4rem;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        padding: 5rem 2rem;
    }
`;

const Subheading = styled.h5`
    font-size: 1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: #c0c0c3;
`;

const Heading = styled.h1`
    font-size: 4rem;
    font-weight: 700;
    color: #1c1c1c;
    margin: 15px 0;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        font-size: 2.7rem;
        margin: 10px 0;
    }
`;

const Description = styled.div`
    font-size: 1.5rem;
    color: #8b8b92;
    max-width: 1000px;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        font-size: 1.2rem;
    }
`;

export const Red = styled.span`
    font-weight: bold;
    color: #8bc53f;
`;

TextBlock.propTypes = {
    heading: PropTypes.string,
    description: PropTypes.any,
    subheading: PropTypes.string,
};
