// src/hooks/useRegistration.tsx

import { useState } from 'react';
import axiosInstance from '@/config/axios';
import { CustomerRegisterRequest, SellerRegisterRequest, RegistrationResponse } from '@/types/auth/RegistrationTypes';

/**
 * Custom hook for handling registration (Customer or Seller)
 */
export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Register a customer
   * @param data Registration data for a customer
   * @returns Promise of RegistrationResponse
   */
  const registerCustomer = async (data: CustomerRegisterRequest): Promise<RegistrationResponse> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axiosInstance.post('/auth/register/customer', data);
      setLoading(false);
      setSuccessMessage(response.data.message);
      return response.data;
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      throw err;
    }
  };

  /**
   * Register a seller
   * @param data Registration data for a seller
   * @returns Promise of RegistrationResponse
   */
  const registerSeller = async (data: SellerRegisterRequest): Promise<RegistrationResponse> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axiosInstance.post('/auth/register/seller', data);
      setLoading(false);
      setSuccessMessage(response.data.message);
      return response.data;
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      throw err;
    }
  };

  return {
    loading,
    error,
    successMessage,
    registerCustomer,
    registerSeller,
  };
};
