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

  const redeemLoyaltyPoints = async (points: number): Promise<number | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await customerDashboardApi.redeemLoyaltyPoints(points);
  
      // Assuming the response contains the amount added to the wallet, return it
      if (response !== undefined) {
        return response;  // Return the amount added to the wallet
      } else {
        return null;  // If there's no wallet addition in the response, return null
      }
    } catch (err: any) {
      setError(err as ApiError);
      return null;  // In case of an error, return null
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
    redeemLoyaltyPoints, // Expose this function for use in the component
  };
};

export default useCustomerDashboard;