import CMS from 'netlify-cms-app';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';
import ServicesPagePreview from './preview-templates/ServicesPagePreview';
import HomePagePreview from './preview-templates/HomePagePreview';

CMS.registerPreviewTemplate('index', HomePagePreview);
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
CMS.registerPreviewTemplate('services', ServicesPagePreview);
