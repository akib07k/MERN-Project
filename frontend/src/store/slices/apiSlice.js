// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // // import { BASE_URL } from '../../constants';
// // export const BASE_URL = 'http://localhost:8080';

// // const baseQuery = fetchBaseQuery({
// //   // baseUrl: BASE_URL,
// //   baseUrl: 'http://localhost:8080',
// //   // credentials: 'include',
// // });

// // const baseQueryWithReauth = async (args, api, extraOptions) => {
// //   let result = await baseQuery(args, api, extraOptions);

// //   if (result.error && result.error.status === 401) {
// //     // Clear user info on 401 error
// //     import('./authSlice').then((module) => {
// //        api.dispatch(module.logout());
// //     });
// //   }
// //   return result;
// // };

// // export const apiSlice = createApi({
// //   baseQuery: baseQueryWithReauth,
// //   tagTypes: ['Product', 'Order', 'User'],
// //   endpoints: (builder) => ({}),
// // });

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const BASE_URL = 'http://localhost:8080';

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,

//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.userInfo?.token;

//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     import('./authSlice').then((module) => {
//       api.dispatch(module.logout());
//     });
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Product', 'Order', 'User'],
//   endpoints: (builder) => ({}),
// });
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const BASE_URL = 'http://localhost:8080';

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: 'include', // 🔥 VERY IMPORTANT (cookie bhejne ke liye)
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   // 🔒 Agar 401 aaye → logout
//   if (result.error && result.error.status === 401) {
//     const { logout } = await import('./authSlice');
//     api.dispatch(logout());
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Products', 'Order', 'User'],
//   endpoints: (builder) => ({}),
// });
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = 'http://localhost:8080';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // cookies ke liye
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.userInfo?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { logout } = await import('./authSlice');
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'Order', 'User'], // 🔥 MUST MATCH
  endpoints: () => ({}),
});