import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from 'antd';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import Instagram from '../img/social/instagram.svg';
import plants from '../img/little-plants.jpg';
import theme from '../components/theme';

const { Footer: AntdFooter } = Layout;

export const FooterTemplate = ({ instagram, email, telephones }) => {
    return (
        <ThemeProvider theme={theme}>
            <StyledFooter>
                <StyledFirstCell>
                    <div>
                        <Title>
                            Kaizen Farms<Dot>.</Dot>
                        </Title>
                        <Tagline>
                            Dominican Producers <Dot>&</Dot> Exporters
                        </Tagline>
                    </div>
                </StyledFirstCell>
                <StyledSider>
                    <Title>
                        Contact us<Dot>.</Dot>
                        <Email>
                            <Dot>@</Dot>&nbsp;&nbsp;&nbsp;
                            <a href={'mailto:' + email} subject="Customer enquiry">
                                {email}
                            </a>
                        </Email>
                        <Telephones>
                            <Dot>T</Dot>&nbsp;&nbsp;&nbsp;
                            {telephones.map(({ number }, index) => (
                                <a
                                    href={'tel:' + number}
                                    key={number}
                                    className={index === 0 ? 'first phone' : 'phone'}
                                >
                                    {number}
                                </a>
                            ))}
                        </Telephones>
                    </Title>
                </StyledSider>
                <StyledSecondCell>
                    <Title>
                        Find us on<Dot>:</Dot>
                        <StyledInstagram title="Instagram" href={instagram}>
                            <Instagram />
                        </StyledInstagram>
                    </Title>
                </StyledSecondCell>
            </StyledFooter>
        </ThemeProvider>
    );
};

const StyledFooter = styled.footer`
    height: 100vh;
    position: relative;
    background: #1c1c1c;
    background: url(${plants});
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;

    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    color: #fff;

    // grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const StyledCell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledFirstCell = styled(StyledCell)`
    background: rgba(0, 0, 0, 0.5);
`;

const StyledSecondCell = styled(StyledCell)`
    background: rgba(0, 0, 0, 0.57);
`;

const StyledInstagram = styled.a`
    & svg {
        display: block;
        fill: #3273dc;
        width: 150px;
        margin-top: 20px;
        transition: fill 0.3s;
    }
    &:hover svg {
        fill: #424242;
    }
`;

const StyledSider = styled.div`
    grid-row-end: span 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.55);
`;

const Title = styled.h2`
    font-size: 4.5rem;
    font-weight: bold;
    color: #fff;
`;

const Tagline = styled.h4`
    font-size: 1.5rem;
    color: #fff;
`;

const Telephones = styled.div`
    font-size: 1.5rem;
    color: #424242;
    margin-top: 20px;
    & > .phone {
        display: block;
    }
    & > .first.phone {
        display: inline;
    }
    & > .phone:not(.first) {
        text-indent: 2rem;
    }
`;

const Email = styled.div`
    font-size: 1.5rem;
    color: #424242;
    margin-top: 20px;
`;

const Dot = styled.span`
    font-weight: bold;
    color: crimson;
`;

FooterTemplate.propTypes = {
    instagram: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephones: PropTypes.array,
};

const Footer = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <FooterTemplate
                instagram={post.frontmatter.instagram}
                email={post.frontmatter.email}
                telephones={post.frontmatter.telephones}
            />
        </Layout>
    );
};

Footer.propTypes = {
    data: PropTypes.object.isRequired,
};

export const footerQuery = graphql`
    query Footer($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                instagram
                email
                telephones {
                    number
                }
            }
        }
    }
`;

export default Footer;
