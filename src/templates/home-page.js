import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Measure from 'react-measure';
import throttle from 'lodash/throttle';

import Peppers from '../img/peppers.svg';
import { Container } from '../components/Container';
import Layout from '../components/Layout';
import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import { TitleAndContent } from '../components/TitleAndContent';
import { RevealingText } from '../components/RevealingText';
import { useScrollPercent } from '../components/useScrollPercent';

let titleHiddenChars = 0;
let taglineHiddenChars = 0;

export const HomePageTemplate = ({ title, description, image }) => {
    const [pageHeight, setPageHeight] = useState(0);
    const pageRef = useRef(null);
    const { scrollPercent, direction } = useScrollPercent(pageRef, pageHeight);

    useEffect(() => {
        const update = throttle(() => {
            if (scrollPercent < 0.4) {
                titleHiddenChars = 0;
                taglineHiddenChars = 0;
            } else {
                titleHiddenChars = titleHiddenChars + (direction === 'up' ? -1 : 1);
                taglineHiddenChars = taglineHiddenChars + (direction === 'up' ? -1 : 1);
            }
        }, 20);
        update();
    }, [scrollPercent]);

    return (
        <Container renderInnerWrapper>
            <Measure
                bounds
                onResize={contentRect => {
                    setPageHeight(contentRect.bounds.height);
                }}
            >
                {({ measureRef }) => (
                    <Page ref={measureRef}>
                        <TitleAndContent
                            ref={pageRef}
                            title={({ className }) => (
                                <LeftSide className={className}>
                                    <RevealingText component={<Title>{title}</Title>} hiddenChars={titleHiddenChars} />
                                    <RevealingText
                                        component={<Tagline>{description}</Tagline>}
                                        hiddenChars={taglineHiddenChars}
                                    />
                                </LeftSide>
                            )}
                        >
                            <RightSide>
                                <Peppers />
                            </RightSide>
                        </TitleAndContent>
                    </Page>
                )}
            </Measure>
        </Container>
    );
};

HomePageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const HomePage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <HomePageTemplate
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                image={post.frontmatter.image}
            />
        </Layout>
    );
};

const Page = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const LeftSide = styled.div`
    padding: 1rem 2rem;
    height: fit-content;
`;

const Title = styled.h1`
    font-size: 7rem;
    font-weight: 800;
    color: white;
`;

const RightSide = styled.div`
    width: 100%;
    svg {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Tagline = styled.div`
    font-size: 2rem;
    width: 350px;
`;

const StyledBackground = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: 50% 60%;
    background-repeat: no-repeat;
    background-size: cover;
`;

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HomePage;

export const homePageQuery = graphql`
    query HomePage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                description
                image {
                    childImageSharp {
                        fluid(maxWidth: 3000, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
