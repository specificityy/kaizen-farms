import React from 'react';
import { Layout } from 'antd';
import styled from '@emotion/styled';

const { Content } = Layout;

export const Container = ({ children, renderInnerWrapper, ...props }) => (
    <StyledContent name="container" {...props}>
        <div name="container--content-outer-wrapper">
            {renderInnerWrapper ? <div name="container--content-inner-wrapper">{children}</div> : children}
        </div>
    </StyledContent>
);

const StyledContent = styled(Content)`
    width: 100%;
    & > div {
        width: 100%;
        /* max-width: 1920px; */
        margin-left: auto;
        margin-right: auto;
    }
    & > div > div {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        max-width: 1640px;
    }
`;
