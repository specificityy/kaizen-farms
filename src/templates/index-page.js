import React from 'react';

import Layout from '../components/Layout';
import { Container } from '../components/Container';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';
import { ServicesPage } from '../components/ServicesPage';

const IndexPage = () => {
    return (
        <Layout>
            <Container>
                <HomePage />
                <ProductsPage />
                <ServicesPage />
            </Container>
        </Layout>
    );
};

export default IndexPage;
