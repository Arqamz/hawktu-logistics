
import axiosInstance from '../config/axios';
import { SellerInfoResponse,UpdatSellerInfoRequest,ChangePasswordRequest} from '@/types/sellerdashboard';

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


