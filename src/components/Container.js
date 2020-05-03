import React from 'react';
import { Layout } from 'antd';
import styled from '@emotion/styled';

const { Content } = Layout;

export const Container = ({ children, renderInnerWrapper, ...props }) => (
    <StyledContent name="container" width={1} px={[6, 8]} {...props}>
        <div name="container--content-outer-wrapper">
            {renderInnerWrapper ? (
                <div name="container--content-inner-wrapper" mx="auto" width={1} maxWidth="1640px">
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    </StyledContent>
);

const StyledContent = styled(Content)`
    width: 100%;
    & > div {
        width: 100%;
        max-width: 1920px;
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
