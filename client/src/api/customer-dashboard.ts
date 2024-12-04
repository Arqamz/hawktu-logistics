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
      const response = await axiosInstance.get<LoyaltyPointsResponse>('/customer/loyalty-points');
      return response.data;
    } catch (error: any) {
      throw error as ApiError;
    }
  },

  getWalletBalance: async (): Promise<WalletBalanceResponse> => {
    try {
      const response = await axiosInstance.get<WalletBalanceResponse>('/customer/wallet-balance');
      return response.data;
    } catch (error: any) {
      throw error as ApiError;
    }
  },

  addWalletFunds: async (amount: number): Promise<AddWalletFundsResponse> => {
    try {
      const response = await axiosInstance.post<AddWalletFundsResponse>(
        '/customer/add-wallet-funds',
        null,
        { params: { amount } }
      );
      return response.data;
    } catch (error: any) {
      throw error as ApiError;
    }
  },

  redeemLoyaltyPoints: async (points: number): Promise<string> => {
    try {
      const response = await axiosInstance.post<string>(
        '/customer/redeem-loyalty-points',
        null,
        { params: { points } }
      );
      return response.data;
    } catch (error: any) {
      throw error as ApiError;
    }
  },
};

export default customerDashboardApi;
