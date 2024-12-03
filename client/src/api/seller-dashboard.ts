
import axiosInstance from '../config/axios';
import { SellerInfoResponse, UpdatSellerInfoRequest, ChangePasswordRequest, WalletBalanceResponse, RevenueSummaryResponse, OrdersResponse, OrderCountResponse, ProductCountResponse, ReviewsResponse } from '@/types/sellerdashboard';

export const getProductReviews = async (productId: number): Promise<ReviewsResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<ReviewsResponse>('/seller/products/reviews', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      productId,
    },
  });
  return response.data;
};

export const getSellerInfo = async (): Promise<SellerInfoResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<SellerInfoResponse>('/seller/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const updateSellerInfo = async (data: UpdatSellerInfoRequest): Promise<void> => {
  const token = localStorage.getItem('token');
  await axiosInstance.put('/seller/update-info', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  const token = localStorage.getItem('token');
  await axiosInstance.put('/seller/change-password', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWalletBalance = async (): Promise<WalletBalanceResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<WalletBalanceResponse>('/seller/wallet-balance', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getRevenueSummary = async (): Promise<RevenueSummaryResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<RevenueSummaryResponse>('/seller/revenue', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllOrders = async (): Promise<OrdersResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<OrdersResponse>('/seller/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getOrderCounts = async (): Promise<OrderCountResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<OrderCountResponse>('/seller/orders/count', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getRecentOrders = async (): Promise<OrdersResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<OrdersResponse>('/seller/orders/recent', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getActiveProductCount = async (): Promise<ProductCountResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<ProductCountResponse>('/seller/products/count', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

