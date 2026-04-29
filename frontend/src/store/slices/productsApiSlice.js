// import { apiSlice } from './apiSlice';
// import { PRODUCTS_URL, UPLOAD_URL } from '../../constants';

// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber, category }) => ({
//         url: PRODUCTS_URL,
//         params: { keyword, pageNumber, category },
//       }),
//       keepUnusedDataFor: 5,
//       providesTags: ['Products'],
//     }),

//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),

//     createProduct: builder.mutation({
//       query: () => ({
//         url: PRODUCTS_URL,
//         method: 'POST',
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//       }),
//       providesTags: ['Products'],
//     }),

//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: UPLOAD_URL,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useUploadProductImageMutation,
// } = productsApiSlice;
// import { apiSlice } from './apiSlice';
// import { PRODUCTS_URL, UPLOAD_URL } from '../../constants';

// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber, category }) => ({
//         url: PRODUCTS_URL,
//         params: { keyword, pageNumber, category },
//       }),
//       keepUnusedDataFor: 5,
//       providesTags: ['Products'],
//     }),

//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),

//     createProduct: builder.mutation({
//       query: () => ({
//         url: PRODUCTS_URL,
//         method: 'POST',
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data._id}`, // ✅ FIXED HERE
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//       }),
//       providesTags: ['Products'],
//     }),

//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: UPLOAD_URL,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useUploadProductImageMutation,
// } = productsApiSlice;

// import { apiSlice } from './apiSlice';
// import { PRODUCTS_URL, UPLOAD_URL } from '../../constants';

// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber, category }) => ({
//         url: PRODUCTS_URL,
//         params: { keyword, pageNumber, category },
//       }),
//       keepUnusedDataFor: 5,
//       providesTags: ['Products'],
//     }),

//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),

//     createProduct: builder.mutation({
//       query: () => ({
//         url: PRODUCTS_URL,
//         method: 'POST',
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data._id}`, // ✅ FIXED HERE
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//       }),
//       providesTags: ['Products'],
//     }),

//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: UPLOAD_URL,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useUploadProductImageMutation,
// } = productsApiSlice;
// import { apiSlice } from './apiSlice';
// import { PRODUCTS_URL, UPLOAD_URL } from '../../constants';

// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

//     // 🔹 GET ALL PRODUCTS
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber, category }) => ({
//         url: PRODUCTS_URL,
//         params: { keyword, pageNumber, category },
//       }),
//       keepUnusedDataFor: 5,

//       // 🔥 ADVANCED TAGGING (BEST PRACTICE)
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.products.map(({ _id }) => ({
//                 type: 'Products',
//                 id: _id,
//               })),
//               { type: 'Products', id: 'LIST' },
//             ]
//           : [{ type: 'Products', id: 'LIST' }],
//     }),

//     // 🔹 GET PRODUCT DETAILS
//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//       }),
//       keepUnusedDataFor: 5,
//       providesTags: (result, error, id) => [{ type: 'Products', id }],
//     }),

//     // 🔹 CREATE PRODUCT
//     createProduct: builder.mutation({
//       query: () => ({
//         url: PRODUCTS_URL,
//         method: 'POST',
//       }),
//       invalidatesTags: [{ type: 'Products', id: 'LIST' }], // 🔥 auto refresh list
//     }),

//     // 🔹 UPDATE PRODUCT
//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data._id}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: (result, error, data) => [
//         { type: 'Products', id: data._id },
//         { type: 'Products', id: 'LIST' },
//       ],
//     }),

//     // 🔹 DELETE PRODUCT
//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: [{ type: 'Products', id: 'LIST' }], // 🔥 FIXED
//     }),

//     // 🔹 CREATE REVIEW
//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: (result, error, data) => [
//         { type: 'Products', id: data.productId },
//       ],
//     }),

//     // 🔹 UPLOAD IMAGE
//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: UPLOAD_URL,
//         method: 'POST',
//         body: data,
//       }),
//     }),

//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useUploadProductImageMutation,
// } = productsApiSlice;
import { apiSlice } from './apiSlice';
import { PRODUCTS_URL, UPLOAD_URL } from '../../constants';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 GET PRODUCTS
    getProducts: builder.query({
      query: ({ keyword, pageNumber, category }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber, category },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    // 🔹 PRODUCT DETAILS
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // 🔹 CREATE PRODUCT
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Products'], //  auto refresh
    }),

    // 🔹 UPDATE PRODUCT
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // 🔹 DELETE PRODUCT
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'], // FIXED
    }),

    // 🔹 IMAGE UPLOAD
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useUploadProductImageMutation,
} = productsApiSlice;