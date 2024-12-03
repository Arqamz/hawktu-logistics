import { useState } from 'react';
import customerDashboardApi from '@/api/customer-dashboard';
import { LoyaltyPointsResponse, WalletBalanceResponse, ApiError } from '@/types/customerdashboard';

const useCustomerDashboard = () => {
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPointsResponse | null>(null);
  const [walletBalance, setWalletBalance] = useState<WalletBalanceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchLoyaltyPoints = async () => {
    setLoading(true);
    setError(null);
    try {
      const points = await customerDashboardApi.getLoyaltyPoints();
      setLoyaltyPoints(points);
    } catch (err: any) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const balance = await customerDashboardApi.getWalletBalance();
      setWalletBalance(balance);
    } catch (err: any) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  const addWalletFunds = async (amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const updatedBalance = await customerDashboardApi.addWalletFunds(amount);
      setWalletBalance(updatedBalance);
    } catch (err: any) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  return {
    loyaltyPoints,
    walletBalance,
    loading,
    error,
    fetchLoyaltyPoints,
    fetchWalletBalance,
    addWalletFunds,
  };
};

export default useCustomerDashboard;
