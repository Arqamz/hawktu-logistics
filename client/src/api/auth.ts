import axios from 'axios';
import axiosInstance from '@/config/axios';  // Import the Axios instance with global config
import { LoginRequest, LoginResponse } from '@/types/auth/LoginTypes';

/**
 * Login API call
 * @param data Login request data containing email and password
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {

    const loginRequestWithAccountType = { 
      ...data,
      account_type: 'customer'  // Temporary hardcoded account type for testing
    };

    console.log('Sending login request:', loginRequestWithAccountType);

    const response = await axiosInstance.post('/auth/login', loginRequestWithAccountType);
  
    // Debug: Log the response data
    console.log('Login response:', response.data);
    
    
    // const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  } catch (error: unknown) {
    // Use axios.isAxiosError to check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};