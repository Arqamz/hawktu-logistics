import { useState, useEffect } from 'react';
import { getSellerInfo, updateSellerInfo, changePassword } from '@/api/seller-dashboard';
import {SellerInfoResponse,ChangePasswordRequest,UpdatSellerInfoRequest } from '@/types/sellerdashboard';

export const useSellerInfo = () => {
  const [sellerInfo, setSellerInfo] = useState<SellerInfoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const data = await getSellerInfo();
        setSellerInfo(data);
      } catch (err) {
        setError('Error fetching seller info');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerInfo();
  }, []);

  return { sellerInfo, loading, error };
};

export const useUpdateSellerInfo = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const updateInfo = async (data: UpdatSellerInfoRequest) => {
      try {
        setLoading(true);
        await updateSellerInfo(data);
      } catch (err) {
        setError('Error updating seller info');
      } finally {
        setLoading(false);
      }
    };
  
    return { updateInfo, loading, error };
  };
  
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
  