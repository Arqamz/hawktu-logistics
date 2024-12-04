// hooks.ts

import { useState, useEffect } from 'react';
import { getCustomerInfo, updateCustomerInfo, changePassword } from '@/api/customer-info';
import { UpdateCustomerInfoRequest, ChangePasswordRequest, CustomerInfoResponse } from '@/types/customerinfo';

// Hook to get customer information
export const useCustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const data = await getCustomerInfo();
        setCustomerInfo(data);
      } catch (err) {
        setError('Error fetching customer info');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);

  return { customerInfo, loading, error };
};

// Hook to update customer information
export const useUpdateCustomerInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const updateInfo = async (data: UpdateCustomerInfoRequest) => {
    try {
      setLoading(true);
      await updateCustomerInfo(data);
    } catch (err) {
      setError('Error updating customer info');
    } finally {
      setLoading(false);
    }
  };

  return { updateInfo, loading, error };
};

// Hook to change the password
export const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const changePwd = async (data: ChangePasswordRequest) => {
    try {
      setLoading(true);
      await changePassword(data);
    } catch (err) {
      setError('Error changing password');
    } finally {
      setLoading(false);
    }
  };

  return { changePwd, loading, error };
};
