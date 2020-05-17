import React from 'react';
import styled from '@emotion/styled';

export const Container = React.forwardRef(({ children, renderInnerWrapper, ...props }, ref) => {
    const StyledContent = calcStyledContent(renderInnerWrapper);
    return (
        <StyledContent name="container" {...props} className={props.className} ref={ref}>
            <div name="container--content-outer-wrapper">
                {renderInnerWrapper ? <div name="container--content-inner-wrapper">{children}</div> : children}
            </div>
        </StyledContent>
    );
});

const calcStyledContent = renderInnerWrapper => styled.main`
    width: 100%;
    & > div {
        width: 100%;
        /* max-width: 1920px; */
        margin-left: auto;
        margin-right: auto;
    }
    ${renderInnerWrapper
        ? `& > div > div {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }`
        : ''}
`;
