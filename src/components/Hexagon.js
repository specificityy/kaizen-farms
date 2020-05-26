import React from 'react';
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

export const Hexagon = ({ children, name, ...props }) => (
    <>
        <HexagonListItem {...props}>
            <HexagonInner>
                {children}
                <Name>{name}</Name>
            </HexagonInner>
        </HexagonListItem>
    </>
);

// padding = 1.15473441108545 * width
const PADDING_FACTOR = 1.15473441108545;
const HexagonListItem = styled.li`
    ${props => `
    position: relative;
    float: left;
    width: 27.85714285714286%;
    padding: 0 0 32.16760145166612% 0;
    list-style-type: none;
    transform: rotate(-60deg) skewY(30deg);
    overflow: hidden;
    visibility: hidden;
    margin-right: 2%;

    transition: all 700ms;

    & * {
        visibility: visible;
    }

    &:nth-of-type(6n + 4),
    &:nth-of-type(6n + 5),
    &:nth-of-type(6n + 6) {
        margin-top: -3.9285714285%;
        margin-bottom: -3.9285714285%;
    }

    &:nth-of-type(6n + 1),
    &:nth-of-type(6n + 2),
    &:nth-of-type(6n + 3) {
        transform: translateX(50%) rotate(-60deg) skewY(30deg);

        & .overlay:before {
            background-position: 77% 50%;
        }
    }

    &:nth-of-type(6n + 1) {
        margin-left: 0.5%;
    }

    // @media (${props.theme.mediaQueries.l}) {
    //     width: 30%;
    //     padding: 0 0 ${30 * PADDING_FACTOR}% 0;

    //     &:nth-of-type(2n - 1) {
    //         transform: translateX(0) rotate(-60deg) skewY(30deg);
    //     }

    //     &:nth-of-type(2n - 1):not(:first-of-type) {
    //         margin-bottom: 5%;
    //     }

    //     &:nth-of-type(2n - 1):not(:last-of-type) {
    //         margin-top: 5%;
    //     }

    //     &:nth-of-type(2n) {
    //         transform: translate(-29%,83%) rotate(-60deg) skewY(30deg);
    //     }
    // }

    ${
        props.reveal
            ? ''
            : `
                &:nth-of-type(n + 1) {
                    margin-left: 0;;
                }

                &:nth-of-type(3n + 2) {
                    margin: 0;
                }

                &:nth-of-type(6n + 4),
                &:nth-of-type(6n + 5),
                &:nth-of-type(6n + 6) {
                    margin-top: -8.2%;
                    margin-bottom: -8.2%;
                }

                &:nth-of-type(6n + 1),
                &:nth-of-type(6n + 2),
                &:nth-of-type(6n + 3) {
                    transform: translateX(50%) rotate(-60deg) skewY(30deg);

                    & .overlay:before {
                        background-position: 77% 50%;
                    }
                }

                &:nth-of-type(6n + 1) {
                    margin-left: 0;
                }
                `
    }
    
    
    `}
`;

const HexagonInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: skewY(-30deg) rotate(60deg);
    overflow: hidden;
    background: none;
`;

const Name = styled.h3`
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 20px;
    position: absolute;
    top: -5%;
    left: 75%;
    background: rgba(25, 25, 25, 0.7);
    color: #fff;
    padding: 5px 10px;
    z-index: 10;
    transform: translateX(-50%);
    width: 50%;
    text-align: center;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        font-size: 0.7rem;
    }
`;
