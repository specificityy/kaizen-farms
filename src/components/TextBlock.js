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
`;

const Subheading = styled.h5`
    font-size: 1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: #c0c0c3;
`;

const Title = styled.h1`
    font-size: 5rem;
    font-weight: 700;
    line-height: 1.12;
    color: #1c1c1c;
`;

const Description = styled.p`
    font-size: 1.5rem;
    color: #8b8b92;
    max-width: 1000px;
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
