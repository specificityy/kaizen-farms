import React from 'react';

import Layout from '../components/Layout';
import { Container } from '../components/Container';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';
import { ServicesPage } from '../components/ServicesPage';
import { AboutPage } from '../components/AboutPage';

const IndexPage = () => {
    return (
        <Layout>
            <Container>
                <HomePage />
                <ProductsPage />
                <AboutPage />
                <ServicesPage />
            </Container>
        </Layout>
    );
};

export default IndexPage;
