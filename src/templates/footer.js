import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from 'antd';
import styled from '@emotion/styled';

import Instagram from '../img/social/instagram.svg';

const { Footer: AntdFooter } = Layout;

export const FooterTemplate = ({ instagram, email, telephones }) => {
    return (
        <StyledFooter>
            <StyledContainer>
                <StyledContent>
                    <StyledFirstCell>
                        <div>
                            <Title>
                                Kaizen Farms<Red>.</Red>
                            </Title>
                            <Tagline>
                                Dominican Producers <Red>&</Red> Exporters
                            </Tagline>
                        </div>
                    </StyledFirstCell>
                    <StyledSider>
                        <Title>
                            Contact us<Red>.</Red>
                            <Email>
                                <Red>@</Red> {email}
                            </Email>
                            <Telephone>
                                <Red>T</Red> <span>849-207-7478</span>
                                <div>829-221-7827</div>
                                <div>809-698-3192</div>
                                <div>829-717-4948</div>
                            </Telephone>
                        </Title>
                    </StyledSider>
                    <StyledSecondCell>
                        <Title>
                            Find us on<Red>:</Red>
                            <a title="Instagram" href={instagram}>
                                <Instagram />
                            </a>
                        </Title>
                    </StyledSecondCell>
                </StyledContent>
            </StyledContainer>
        </StyledFooter>
    );
};

const StyledFooter = styled(AntdFooter)`
    height: 100vh;
    background: #1c1c1c;
`;

const StyledContainer = styled.div`
    height: 100%;
`;

const StyledContent = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    color: #fff;
`;

const StyledCell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledFirstCell = styled(StyledCell)`
    background: #1f1f1f;
`;

const StyledSecondCell = styled(StyledCell)`
    background: #232323;
    & svg {
        display: block;
        fill: #424242;
        width: 150px;
        margin-top: 20px;
    }
`;

const StyledSider = styled.div`
    grid-row-end: span 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1c1c1c;
`;

const Title = styled.h2`
    font-size: 4.5rem;
    font-weight: bold;
    color: #fff;
`;

const Tagline = styled.h4`
    font-size: 1.5rem;
    color: #424242;
`;

const Telephone = styled.h4`
    font-size: 1.5rem;
    color: #424242;
    margin-top: 20px;
    & > *:nth-child(n + 1) {
        text-indent: 1rem;
    }
`;

const Email = styled.h4`
    font-size: 1.5rem;
    color: #424242;
    margin-top: 20px;
`;

const Red = styled.span`
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
