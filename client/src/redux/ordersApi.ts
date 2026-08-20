import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  itemTotal: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/+$/, '')}/orders`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Orders', 'Cart'],
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, void>({
      query: () => ({
        url: '',
        method: 'POST',
      }),
      invalidatesTags: ['Orders', 'Cart'],
    }),
    getAllOrders: builder.query<Order[], void>({
      query: () => '',
      providesTags: ['Orders'],
    }),
    getUserOrders: builder.query<Order[], void>({
      query: () => '/my-orders',
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
} = ordersApi;
