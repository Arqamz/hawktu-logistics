
import axiosInstance from '../config/axios';
import { CustomerInfoResponse, UpdateCustomerInfoRequest, ChangePasswordRequest } from '@/types/customerinfo';

export const getCustomerInfo = async (): Promise<CustomerInfoResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<CustomerInfoResponse>('/customer/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCustomerInfo = async (data: UpdateCustomerInfoRequest): Promise<void> => {
  const token = localStorage.getItem('token');
  await axiosInstance.put('/customer/update-info', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  const token = localStorage.getItem('token');
  await axiosInstance.put('/customer/change-password', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
