import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import Instagram from '../img/social/instagram.svg';
import theme from '../components/theme';
import { Red } from '../components/TextBlock';

export const FooterTemplate = ({ instagram, email, telephones }) => {
    return (
        <ThemeProvider theme={theme}>
            <StyledFooter id="contact">
                <StyledFirstCell>
                    <div>
                        <Heading>
                            Kaizen Farms<Red>.</Red>
                        </Heading>
                        <Subheading>Dominican Producers and Exporters</Subheading>
                    </div>
                </StyledFirstCell>
                <StyledSider>
                    <Heading>
                        Contact us<Red>.</Red>
                        <Email>
                            <Red>@</Red>&nbsp;&nbsp;&nbsp;
                            <a href={'mailto:' + email} subject="Customer enquiry">
                                {email}
                            </a>
                        </Email>
                        <Telephones>
                            {telephones.map(({ number }, index) => (
                                <a href={'tel:' + number} key={number} className={index === 0 ? 'first-phone' : ''}>
                                    {number}
                                </a>
                            ))}
                        </Telephones>
                    </Heading>
                </StyledSider>
                <StyledSecondCell>
                    <Heading>
                        Find us on<Red>:</Red>
                        <StyledInstagram title="Instagram" href={instagram}>
                            <Instagram />
                        </StyledInstagram>
                    </Heading>
                </StyledSecondCell>
            </StyledFooter>
        </ThemeProvider>
    );
};

// #12843C
// #33953B
// #56A73D

const StyledFooter = styled.footer`
    height: 100vh;
    position: relative;
    background: #1c1c1c;

    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    color: #fff;

    @media (${({ theme }) => theme.mediaQueries.m}) {
        grid-template-columns: 100%;
        grid-template-rows: repeat(4, 1fr);
    }
`;

const StyledCell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 50px 0;
`;

const StyledFirstCell = styled(StyledCell)`
    background: #1f1f1f;
    @media (${({ theme }) => theme.mediaQueries.m}) {
        grid-row: 4;
    }
`;

const StyledSecondCell = styled(StyledCell)`
    background: #232323;
`;

const StyledInstagram = styled.a`
    & svg {
        display: block;
        fill: #3273dc;
        width: 100px;
        margin-top: 20px;
        transition: fill 0.3s;
        @media (${({ theme }) => theme.mediaQueries.m}) {
            width: 50px;
        }
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
    background: #1c1c1c;
`;

const Heading = styled.h2`
    font-size: 3.5rem;
    font-weight: bold;
    color: #fff;
    @media (${({ theme }) => theme.mediaQueries.m}) {
        font-size: 2.3rem;
    }
`;

const BaseSubheading = styled.div`
    font-size: 1.2rem;
    @media (${({ theme }) => theme.mediaQueries.m}) {
        font-size: 1.2rem;
    }
`;

const Subheading = styled(BaseSubheading)`
    color: #424242;
`;

const Telephones = styled(BaseSubheading)`
    color: #424242;
    margin-top: 20px;
    a {
        display: block;
        text-indent: 2.5rem;
        margin-bottom: 0.7rem;
        &.first-phone {
            position: relative;
            &::before {
                content: 'T';
                color: crimson;
                position: absolute;
                left: -2rem;
            }
        }
    }
`;

const Email = styled(BaseSubheading)`
    color: #424242;
    margin-top: 20px;
`;

FooterTemplate.propTypes = {
    instagram: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephones: PropTypes.array,
};

const Footer = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <FooterTemplate
            instagram={post.frontmatter.instagram}
            email={post.frontmatter.email}
            telephones={post.frontmatter.telephones}
        />
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
