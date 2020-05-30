import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import sortBy from 'lodash/sortBy';
import throttle from 'lodash/throttle';

import HamburgerIcon from '../assets/img/hamburger-icon.svg';
import CloseIcon from '../assets/img/close-icon.svg';
import theme from '../components/theme';

const links = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About us' },
    { href: 'products', label: 'Products' },
    { href: 'services', label: 'Services' },
    { href: 'contact', label: 'Contact' },
];

const getActiveLink = () =>
    sortBy(
        links.map(({ href }) => {
            const rect = document.getElementById(href).getBoundingClientRect();
            return { href, top: Math.abs(rect.top) };
        }),
        'top'
    )[0].href;

const Navbar = ({ onOpen, onClose, open, maxWidth, contentRef }) => {
    const [active, setActive] = useState(links[0].href);

    useEffect(() => {
        const content = contentRef.current;
        const handleScroll = throttle(() => setActive(getActiveLink()), 300);
        content.addEventListener('scroll', handleScroll);
        return () => {
            content.removeEventListener('scroll', handleScroll);
        };
    }, [contentRef]);

    return (
        <ThemeProvider theme={theme} id="contact">
            <OpenButton
                onClick={onOpen}
                fill={/home|contact/.test(active) ? '#8BC53F' : '#007A3B'}
                title="Close navigation"
            />

            <Drawer open={open} maxWidth={maxWidth}>
                <CloseButton onClick={onClose} title="Close navigation" />

                {links.map(({ href, label }) => (
                    <Link key={href} href={`#${href}`} onClick={onClose} active={href === active}>
                        {label}
                    </Link>
                ))}
            </Drawer>
        </ThemeProvider>
    );
};

const Drawer = styled.aside`
    ${props => `
    position: fixed;
    z-index: 100;
    height: 100vh;
    width: 50vw;
    max-width: ${props.maxWidth}px;
    top: 0;
    bottom: 0;
    right: 0;
    transition: transform ${props.theme.transitions.duration.standard}ms;
    transform: ${props.open ? 'none' : 'translateX(100%)'};
    background: white;
    padding: 30px;
    box-shadow: ${props.theme.shadows[8]};
`}
`;

const Link = styled.a`
    display: block;
    font-size: ${props => (props.active ? '1.3' : '1.2')}rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    text-align: center;
    color: ${props => (props.active ? '#007A3B' : '#8BC53F')};
    font-weight: ${props => (props.active ? '700' : '400')};
    margin-bottom: 40px;
    &:hover {
        color: #007a3b;
    }
`;

const OpenButton = styled(HamburgerIcon)`
    position: fixed;
    z-index: 100;
    top: 30px;
    right: 30px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    transition: fill ${props => props.theme.transitions.duration.standard}ms;
    fill: ${props => props.fill};
`;

const CloseButton = styled(CloseIcon)`
    display: block;
    margin: 0 0 40px;
    z-index: 100;
    cursor: pointer;
    width: 32px;
    height: 32px;
    margin-left: auto;
    fill: #007a3b;
    &:hover svg {
        fill: #8bc53f;
    }
`;

export default Navbar;
