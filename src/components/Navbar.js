import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { Menu, Layout } from 'antd';

import { Container } from './Container';

import logo from '../img/kaizen-farms-logo.jpg';

const Navbar = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            navBarActiveClass: '',
        };
    }

    toggleHamburger = () => {
        // toggle the active boolean in the state
        this.setState(
            {
                active: !this.state.active,
            },
            // after state has been updated,
            () => {
                // set the class in state for the navbar accordingly
                this.state.active
                    ? this.setState({
                          navBarActiveClass: 'is-active',
                      })
                    : this.setState({
                          navBarActiveClass: '',
                      });
            }
        );
    };
    render() {
        return (
            <StyledContainer renderInnerWrapper>
                <StyledHeader>
                    <StyledLink to="/">
                        <StyledLogo />
                    </StyledLink>
                    <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="/about">
                            <StyledLink to="/about">About</StyledLink>
                        </Menu.Item>
                        <Menu.Item key="/products">
                            <StyledLink to="/products">Products</StyledLink>
                        </Menu.Item>
                        <Menu.Item key="/blog">
                            <StyledLink to="/blog">Blog</StyledLink>
                        </Menu.Item>
                        <Menu.Item key="/contact">
                            <StyledLink to="/contact">Contact</StyledLink>
                        </Menu.Item>
                        <Menu.Item key="/contact/examples">
                            <StyledLink to="/contact/examples">Form Examples</StyledLink>
                        </Menu.Item>
                    </Menu>
                </StyledHeader>
            </StyledContainer>
        );
    }
};

const StyledHeader = styled(Layout.Header)`
    background: none;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    ul {
        background: none;
        border-bottom: none;
        font-weight: bold;
    }
`;

const StyledContainer = styled(Container)`
    background: rgba(25, 25, 25, 0.4);
    z-index: 10;
`;

const StyledLogo = styled.div`
    width: 150px;
    height: 50px;
    background: url(${logo}) no-repeat 50% scroll;
`;

const StyledLink = styled(Link)`
    color: #fff !important;
`;

export default Navbar;
