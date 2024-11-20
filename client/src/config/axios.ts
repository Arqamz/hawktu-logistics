import axios from 'axios';

// Base URL for the API (this is just an example for now, it could be in an .env file)
const API_URL = 'http://localhost:8080/api';

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptors are functions that allow you to run code before a request is sent or after a response is received.
// This is useful for handling things like JWT token injection, handling errors, or logging.

// Request interceptor: Executes before the request is made
axiosInstance.interceptors.request.use(
  (config) => {
    // Here, we check if there’s a JWT token stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Add the token to the Authorization header for every request that requires it
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Always return the config to continue the request
  },
  (error) => {
    return Promise.reject(error); // If there's an error before the request is sent, reject it
  }
);

// Response interceptor: Executes after a response is received from the server
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // If the request is successful, return the response data
  },
  (error) => {
    // Here, we can handle global errors, like unauthorized access or server errors.
    if (error.response && error.response.status === 401) {
      // For example, if a 401 Unauthorized response is returned, we might want to log out the user
      localStorage.removeItem('token'); // Remove invalid token
      window.location.href = '/login'; // Redirect to the login page
    }
    return Promise.reject(error); // Reject any other error
  }
);

export default axiosInstance; // Export the Axios instance for use throughout the app
