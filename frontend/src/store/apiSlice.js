import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',

//   prepareHeaders: (headers, { getState }) => {
//     // 1. Get the 'auth' state from the Redux store
//     const token = getState().auth.userInfo?.token;

//     // 2. If we have a token, attach it to the header
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }

//     return headers;
//   },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});