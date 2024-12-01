import { useState } from 'react';
import { login } from '@/api/auth';
import { LoginRequest } from '@/types/auth/LoginTypes';
import axios from 'axios';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const loginUser = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);  // Reset the success flag before login attempt

    try {
      const response = await login(data);  // Directly login
      localStorage.setItem('token', response.token);
      setIsSuccess(true);
      return response;  // Return the response to be used directly in the form submit
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