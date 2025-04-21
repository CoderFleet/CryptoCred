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

  connectWallet: async () => {
    try {
      // Check if ethereum (MetaMask) is available
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to use wallet authentication.');
      }
  
      // Handle MetaMask connection with error handling and timeout
      let accounts;
      try {
        accounts = await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('MetaMask connection timed out. Please try again.')), 20000); // 20 seconds timeout
          window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(resolve)
            .catch(reject)
            .finally(() => clearTimeout(timeout)); // Clean up the timeout
        });
      } catch (metamaskError) {
        // Handle specific MetaMask errors
        if (metamaskError.code === 4001) {
          throw new Error('You rejected the connection request. Please approve MetaMask connection to continue.');
        } else if (metamaskError.code === -32002) {
          throw new Error('MetaMask is already processing a connection request. Please check your MetaMask extension.');
        } else {
          throw new Error(`MetaMask connection failed: ${metamaskError.message}`);
        }
      }
  
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your MetaMask wallet and try again.');
      }
  
      const address = accounts[0];
      console.log('Connected to wallet address:', address);
  
      // Get a nonce from the server to sign
      let nonceResponse;
      try {
        nonceResponse = await api.get(`${API_URL}/auth/wallet-nonce?address=${address}`);
        console.log('Nonce response:', nonceResponse.data);
        if (!nonceResponse || !nonceResponse.data || !nonceResponse.data.nonce) {
          throw new Error('Failed to retrieve nonce from server.');
        }
      } catch (nonceError) {
        console.error('Nonce retrieval error:', nonceError);
        throw new Error('Failed to get authentication challenge from server. Please try again.');
      }
  
      const nonce = nonceResponse.data.nonce;
      const messageToSign = `Authenticate with CryptoCred: ${nonce}`;
      console.log('Message to sign:', messageToSign);
  
      // Sign the nonce with the wallet
      let signature;
      try {
        signature = await new Promise((resolve, reject) => {
          window.ethereum.request({
            method: 'personal_sign',
            params: [messageToSign, address],
          }).then(resolve).catch(reject);
        });
      } catch (signError) {
        if (signError.code === 4001) {
          throw new Error('You rejected the signature request. Please approve signature to authenticate.');
        } else {
          throw new Error(`Signature request failed: ${signError.message}`);
        }
      }
  
      console.log('Message signed with signature:', signature);
  
      // Verify signature on the backend
      const authResponse = await api.post('/auth/wallet-auth', {
        address,
        signature
      });
  
      if (authResponse.data.token) {
        // Store the authentication token and user data
        localStorage.setItem('token', authResponse.data.token);
        localStorage.setItem('user', JSON.stringify(authResponse.data.user));
        localStorage.setItem('walletAddress', address);
  
        // Logging for success
        console.log('Authentication successful. User data saved:', authResponse.data.user);
      }
  
      return authResponse.data;
    } catch (error) {
      console.error('Wallet connection error:', error);
      // Throw a custom error message to display to the user
      throw new Error(error.message || 'Wallet connection failed. Please try again.');
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