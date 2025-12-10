// E:\study\worker_inventory\worker_inventory_app\config\axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token to all requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.log('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, 'Status:', response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log('API Error:', error.response?.status, error.response?.data);

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          console.log('No refresh token available, user needs to login');
          throw error;
        }

        console.log('Attempting token refresh...');
        
        // Call refresh endpoint
        const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        
        // Save new token
        await AsyncStorage.setItem('token', newAccessToken);
        console.log('Token refreshed successfully');

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.log('Token refresh failed:', refreshError.response?.data);
        
        // Clear storage and force logout
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('is_staff');
        await AsyncStorage.removeItem('isAdmin');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('username');
        
        // You might want to dispatch a SIGN_OUT action here
        // For now, just reject the error
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;