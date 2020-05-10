import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const TitleAndContent = React.forwardRef(({ title, children }, ref) => {
    const LeftSide = leftSideStyle(title);
    return (
        <StyledSection ref={ref}>
            <LeftSide />
            <RightSide>{children}</RightSide>
        </StyledSection>
    );
});

const leftSideStyle = title => styled(title)`
    color: white;
    font-size: 5rem;
    font-weight: 100;
    flex: 0 1 auto;
    margin-right: 50px;
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 50vh;
`;

const RightSide = styled.div`
    flex: 1 1 80%;
    position: relative;

    height: 100%;
    max-width: 1500px;
    display: flex;

    & > :first-of-type {
        flex: 1 0 100%;
    }
`;

const StyledSection = styled.section`
    width: 100%;
    height: 200vh;
    display: flex;
    justify-content: space-between;
`;

TitleAndContent.propTypes = {
    title: PropTypes.func,
    children: PropTypes.node,
};
