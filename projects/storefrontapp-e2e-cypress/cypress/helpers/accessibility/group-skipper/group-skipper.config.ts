import { testProductUrl } from '../tabbing-order';

export interface GroupSkipperPageConfig {
  pageUrl: string;
  expectedSkipperCount: number;
}

export interface GroupSkipperConfig {
  [name: string]: GroupSkipperPageConfig;
}

export const groupSkipperConfigNotLoggedIn: GroupSkipperConfig = {
  home: { pageUrl: '/', expectedSkipperCount: 3 },
  login: { pageUrl: '/login', expectedSkipperCount: 3 },
  register: { pageUrl: '/login/register', expectedSkipperCount: 3 },
  termsAndConditiong: {
    pageUrl: '/terms-and-conditions',
    expectedSkipperCount: 3,
  },
  forgotPassword: {
    pageUrl: '/login/forgot-password',
    expectedSkipperCount: 3,
  },
  productList: { pageUrl: '/Brands/all/c/brands', expectedSkipperCount: 4 },
  product: { pageUrl: testProductUrl, expectedSkipperCount: 3 },
  cart: { pageUrl: '/cart', expectedSkipperCount: 3 },
  sale: { pageUrl: '/sale', expectedSkipperCount: 3 },
  contact: { pageUrl: '/contact', expectedSkipperCount: 3 },
  help: { pageUrl: '/help', expectedSkipperCount: 3 },
  storeFinder: { pageUrl: '/store-finder', expectedSkipperCount: 3 },
};

export const groupSkipperConfigMyAccount: GroupSkipperConfig = {
  orderHistory: { pageUrl: '/my-account/orders', expectedSkipperCount: 3 },
  changePassword: {
    pageUrl: '/my-account/update-password',
    expectedSkipperCount: 3,
  },
  personalDetails: {
    pageUrl: '/my-account/update-profile',
    expectedSkipperCount: 3,
  },
  updateEmail: { pageUrl: '/my-account/update-email', expectedSkipperCount: 3 },
  closeAccount: {
    pageUrl: '/my-account/close-account',
    expectedSkipperCount: 3,
  },
  consentManagement: {
    pageUrl: '/my-account/consents',
    expectedSkipperCount: 3,
  },
  addressBook: { pageUrl: '/my-account/address-book', expectedSkipperCount: 3 },
  paymentDetails: {
    pageUrl: '/my-account/payment-details',
    expectedSkipperCount: 3,
  },
};

export const groupSkipperConfigCheckout: GroupSkipperConfig = {
  shippingAddress: {
    pageUrl: '/checkout/shipping-address',
    expectedSkipperCount: 3,
  },
  deliveryMode: { pageUrl: '/checkout/delivery-mode', expectedSkipperCount: 3 },
  paymentDetails: {
    pageUrl: '/checkout/payment-details',
    expectedSkipperCount: 3,
  },
  reviewOrder: { pageUrl: '/checkout/review-order', expectedSkipperCount: 3 },
};
