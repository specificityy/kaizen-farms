import React from 'react';
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

export const Hexagon = ({ children, name, ...props }) => (
    <>
        <HexagonListItem {...props}>
            <Name>{name}</Name>
            <Tape />
            <HexagonInner>
                {children}
                <MobileName>{name}</MobileName>
                <BoxSide name="box-side" />
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
    font-size: 1.5rem;
    position: absolute;
    top: 0%;
    left: 75%;
    background: rgba(25, 25, 25, 0.7);
    background-image: linear-gradient(to right, #ddbf6d, #c39d54, #a97b3d, #8d5c28, #713e15);

    color: #fff;
    padding: 5px 10px;
    z-index: 10;
    transform: translate(-50%, 0%);
    width: 50%;
    height: 50%;
    text-align: center;
    padding-top: 5%;
    @media (${({ theme }) => theme.mediaQueries.l}) {
        font-size: 1.2rem;
    }
    @media (${({ theme }) => theme.mediaQueries.m}) {
        // display: none;
        font-size: 0.6rem;
    }
`;

const MobileName = styled.h3`
    font-size: 1rem;
    margin-top: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: rgba(25, 25, 25, 0.7);
    color: #fff;
    padding: 5px 10px;
    z-index: 10;
    transform: translate(-50%, -50%);
    text-align: center;
    display: none;
    width: 100%;
    @media (${({ theme }) => theme.mediaQueries.m}) {
        // display: block;
    }
`;

const BoxSide = styled.div`
    position: absolute;
    top: 0%;
    left: 75%;
    background-image: linear-gradient(to bottom, #ddbf6d, #c39d54, #a97b3d, #8d5c28, #713e15);
    padding: 5px 10px;
    z-index: 10;
    transform: translate(-25%, 100%) skew(0deg, -30deg);
    transform-origin: left top;
    width: 100%;
    height: 50%;
    @media (${({ theme }) => theme.mediaQueries.l}) {
        font-size: 1.2rem;
    }
    @media (${({ theme }) => theme.mediaQueries.m}) {
        // display: none;
        font-size: 0.7rem;
    }
`;

const Tape = styled.div`
    position: absolute;
    top: 25%;
    left: 75%;
    background-color: hsla(0, 0%, 100%, 0.2);
    box-shadow: inset 0 0 1em 0.5em hsla(0, 0%, 100%, 0.1);
    height: 2rem;
    transform: translate(-50%, -50%);
    width: 47%;
    filter: drop-shadow(0 1px 1px hsla(0, 0%, 0%, 0.3));
    z-index: 10;

    @media (${({ theme }) => theme.mediaQueries.m}) {
        height: 1rem;
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        background: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 1px;
        transform: translateY(-50%);
    }

    &::before {
        background-size: 0.4em 0.4em;
        bottom: 0;
        content: '';
        position: absolute;
        top: 0;
        width: 0.2rem;
        background-image: linear-gradient(135deg, transparent 50%, hsla(0, 0%, 100%, 0.3) 50%),
            linear-gradient(-135deg, transparent 50%, hsla(0, 0%, 100%, 0.3) 50%);
        background-position: 100% 100%;
        right: -0.2rem;
    }
`;
