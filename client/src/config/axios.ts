import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:8080/';

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Important for cross-origin requests with credentials
});

// Request interceptor: Executes before the request is made
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.url !== '/auth/login') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Executes after a response is received from the server
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect user to login page
      } else if (error.response.status === 403) {
        alert('You are not authorized to access this resource.');
      } else if (error.response.status === 500) {
        alert('A server error occurred. Please try again later.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
