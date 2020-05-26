import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const TextBlock = ({ title, description, subheading, ...props }) => {
    return (
        <Wrapper {...props}>
            <Subheading>{subheading}</Subheading>
            <Title>
                {title}
                <Dot>.</Dot>
            </Title>
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

const Title = styled.h1`
    font-size: 4rem;
    font-weight: 700;
    color: #1c1c1c;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        font-size: 2.7rem;
        margin: 10px 0;
    }
`;

const Description = styled.p`
    font-size: 1.5rem;
    color: #8b8b92;
    max-width: 1000px;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        font-size: 1.2rem;
    }
`;

const Dot = styled.span`
    font-weight: bold;
    color: crimson;
`;

TextBlock.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    subheading: PropTypes.string,
};
