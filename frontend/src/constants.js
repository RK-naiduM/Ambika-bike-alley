export const BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000'
  : 'https://ambika-bike-alley.onrender.com';


export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';