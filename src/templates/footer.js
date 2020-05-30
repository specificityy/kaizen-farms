import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import Instagram from '../assets/img/social/instagram.svg';
import LogoSvg from '../assets/img/logo-color.svg';
import theme from '../components/theme';
import { Red } from '../components/TextBlock';

export const FooterTemplate = ({
    heading,
    description,
    instagramHeading,
    instagramLink,
    contactHeading,
    email,
    telephones,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <StyledFooter id="contact">
                <StyledFirstCell>
                    <div>
                        <Logo />
                        <Subheading>{description}</Subheading>
                    </div>
                </StyledFirstCell>
                <StyledSider>
                    <Heading>
                        {contactHeading}
                        <Red>.</Red>
                        <Email>
                            <span>@</span>
                            <a href={'mailto:' + email} subject="Kaizen Customer enquiry">
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
                        {instagramHeading}
                        <Red>.</Red>
                        <StyledInstagram title="Instagram" href={instagramLink}>
                            <Instagram />
                        </StyledInstagram>
                    </Heading>
                </StyledSecondCell>
            </StyledFooter>
        </ThemeProvider>
    );
};

/*
Color Verde oscuro
#007A3B
R:0  G:122. B:59

Color Verde claro
#8BC53F
R:139  G:197. B:63
*/

const StyledFooter = styled.footer`
    height: 100vh;
    min-height: 750px;
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
        fill: #007a3b;
        width: 100px;
        margin-top: 20px;
        transition: fill 0.3s;
        @media (${({ theme }) => theme.mediaQueries.m}) {
            width: 50px;
        }
    }
    &:hover svg {
        fill: #8bc53f;
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
                color: #424242;
                position: absolute;
                left: -2rem;
            }
        }
    }
`;

const Email = styled(BaseSubheading)`
    color: #424242;
    margin-top: 20px;
    span:first-of-type {
        margin-right: 1rem;
    }
`;

const Logo = styled(LogoSvg)`
    transform: scale(1.2);
    margin-bottom: 20px;
    @media (${({ theme }) => theme.mediaQueries.s}) {
        transform: scale(0.8);
        margin-bottom: 10px;
    }
`;

FooterTemplate.propTypes = {
    heading: PropTypes.string,
    description: PropTypes.string,
    instagramHeading: PropTypes.string,
    instagramLink: PropTypes.string,
    contactHeading: PropTypes.string,
    email: PropTypes.string,
    telephones: PropTypes.array,
};

const Footer = ({ data }) => {
    const { frontmatter } = data.markdownRemark;
    return <FooterTemplate {...frontmatter} />;
};

Footer.propTypes = {
    data: PropTypes.object.isRequired,
};

export const footerQuery = graphql`
    query Footer($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                heading
                description
                instagramHeading
                instagramLink
                contactHeading
                email
                telephones {
                    number
                }
            }
        }
    }
`;

export default Footer;
