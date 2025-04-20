// frontend/services/auth.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  // Register with email/password
  register: async (email, password, role) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        role: role || 'student' // Default role
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Login with email/password
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Register/Login with wallet
  connectWallet: async () => {
    try {
      // Check if ethereum is available (MetaMask)
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      const address = accounts[0];
      
      // Get a nonce from server to sign
      const nonceResponse = await api.get(`/auth/wallet-nonce?address=${address}`);
      const nonce = nonceResponse.data.nonce;
      
      // Sign the nonce with the wallet
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [
          `Authenticate with CryptoCred: ${nonce}`,
          address
        ]
      });
      
      // Verify signature on backend
      const authResponse = await api.post('/auth/wallet-auth', {
        address,
        signature
      });
      
      if (authResponse.data.token) {
        localStorage.setItem('token', authResponse.data.token);
        localStorage.setItem('user', JSON.stringify(authResponse.data.user));
        localStorage.setItem('walletAddress', address);
      }
      
      return authResponse.data;
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error.response?.data || { message: error.message || 'Wallet connection failed' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('walletAddress');
    return { message: 'Logged out successfully' };
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;