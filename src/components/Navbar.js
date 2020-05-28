import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import sortBy from 'lodash/sortBy';
import throttle from 'lodash/throttle';

import HamburgerIcon from '../img/hamburger-icon.svg';
import CloseIcon from '../img/close-icon.svg';
import theme from '../components/theme';

const links = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About us' },
    { href: 'products', label: 'Products' },
    { href: 'reach', label: 'Our Reach' },
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
            <OpenButton onClick={onOpen} />

            <Drawer open={open} maxWidth={maxWidth}>
                <CloseButton onClick={onClose} />

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
    transition: transform 300ms;
    transform: ${props.open ? 'none' : 'translateX(100%)'};
    background: white;
    padding: 20px;
    box-shadow: ${props.theme.shadows[8]};
`}
`;

const Link = styled.a`
    display: block;
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: ${props => (props.active ? '#40a9ff' : '#c0c0c3')};
    margin-bottom: 20px;
`;

const OpenButton = styled(HamburgerIcon)`
    position: fixed;
    z-index: 100;
    top: 20px;
    right: 20px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    fill: crimson;
`;

const CloseButton = styled(CloseIcon)`
    display: block;
    margin: 0 0 40px;
    z-index: 100;
    cursor: pointer;
    width: 32px;
    height: 32px;
    fill: crimson;
`;

export default Navbar;
