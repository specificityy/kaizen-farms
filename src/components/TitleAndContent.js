import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Container } from '../components/Container';

export const TitleAndContent = React.forwardRef(({ title, className, children, ...props }, ref) => {
    const LeftSide = leftSideStyle(title);
    return (
        <StyledContainer className={className} {...props} ref={ref}>
            <LeftSide />
            <RightSide>{children}</RightSide>
        </StyledContainer>
    );
});

const leftSideStyle = title => styled(title)`
    color: #1c1c1c;
    font-size: 5rem;
    font-weight: 100;
    margin-right: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RightSide = styled.div`
    position: relative;

    flex: 1 1 auto;
    width: 100%;

    max-width: 1500px;
    display: flex;

    & > :first-of-type {
        flex: 1 0 100%;
    }
`;

const StyledContainer = styled(Container)`
    position: fixed;
    will-change: transform;
    margin-bottom: 15vh;
    & > div {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
`;

TitleAndContent.propTypes = {
    title: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
};
