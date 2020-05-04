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
                    <Link to="/">
                        <StyledLogo />
                    </Link>
                    <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="/about">
                            <Link to="/about">About</Link>
                        </Menu.Item>
                        <Menu.Item key="/products">
                            <Link to="/products">Products</Link>
                        </Menu.Item>
                        <Menu.Item key="/blog">
                            <Link to="/blog">Blog</Link>
                        </Menu.Item>
                        <Menu.Item key="/contact">
                            <Link to="/contact">Contact</Link>
                        </Menu.Item>
                        <Menu.Item key="/contact/examples">
                            <Link to="/contact/examples">Form Examples</Link>
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
    background: none;
    z-index: 10;
`;

const StyledLogo = styled.div`
    width: 150px;
    height: 50px;
    background: url(${logo}) no-repeat 50% scroll;
`;

export default Navbar;
