import { apiSlice } from './apiSlice';
import { PRODUCTS_URL, UPLOAD_URL } from '../../constants';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET PRODUCTS
    getProducts: builder.query({
      query: ({ keyword, pageNumber, category }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber, category },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    // PRODUCT DETAILS
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    //   CREATE PRODUCT
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Products'], //  auto refresh
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // DELETE PRODUCT
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'], // FIXED
    }),

    // CREATE REVIEW
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // GET ALL REVIEWS
    getAllReviews: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/reviews`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Reviews'],
    }),

    // DELETE REVIEW
    deleteReviewAdmin: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reviews', 'Products'],
    }),

    //  IMAGE UPLOAD
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
  useUploadProductImageMutation,
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useDeleteReviewAdminMutation,
} = productsApiSlice;