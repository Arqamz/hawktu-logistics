import { useState } from 'react';
import { login } from '@/api/auth'; // Import your API login function
import { LoginRequest } from '@/types/auth/LoginTypes';
import axios, { AxiosError } from 'axios'; // Import AxiosError if using Axios

export const useLogin = () => {
  // React state to track loading, error, and any other states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const loginUser = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await login(data); 
      localStorage.setItem('token', response.token);
      setIsSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed');
      } else {
        setError('An unexpected error occurred. Is the backend running?');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login: loginUser, 
    isLoading, 
    error,
    isSuccess,
  };
};
