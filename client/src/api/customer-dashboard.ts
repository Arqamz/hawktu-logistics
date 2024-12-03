import axiosInstance from '@/config/axios';
import {
  LoyaltyPointsResponse,
  WalletBalanceResponse,
  AddWalletFundsResponse,
  ApiError,
} from '@/types/customerdashboard';

const customerDashboardApi = {
  getLoyaltyPoints: async (): Promise<LoyaltyPointsResponse> => {
    try {
      const response = await axiosInstance.get<LoyaltyPointsResponse>('/customer/dashboard/loyalty-points');
      return response.data;
    } catch (error: any) {
      throw error as ApiError;
    }
  },

  getWalletBalance: async (): Promise<WalletBalanceResponse> => {
    try {
      const response = await axiosInstance.get<WalletBalanceResponse>('/customer/dashboard/wallet-balance');
      return response.data;
    } catch (error: any) {
      throw error as ApiError;
    }
  },

  addWalletFunds: async (amount: number): Promise<AddWalletFundsResponse> => {
    try {
      const response = await axiosInstance.post<AddWalletFundsResponse>(
        '/customer/dashboard/add-wallet-funds',
        null,
        { params: { amount } }
      );
      return response.data;
    } catch (error: any) {
      throw error as ApiError;
    }
  },
};

export default customerDashboardApi;
