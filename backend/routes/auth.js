// routes/auth.routes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import { ethers } from 'ethers';

const router = express.Router();

// Environment variables should be stored in .env file
// const JWT_SECRET = process.env.JWT_SECRET || 'verysecretstring';
// const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';

const generateToken = (user) => {
  return jwt.sign({ 
    id: user._id, 
    role: user.role, 
    walletAddress: user.walletAddress 
  }, process.env.JWT_SECRET, { 
    expiresIn: '1d' 
  });
};

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) 
        return res.status(403).json({ message: 'Forbidden' });
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

// Email/Password Registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Validate role
    if (!['student', 'recruiter', 'institute'].includes(role)) 
      return res.status(400).json({ message: 'Invalid role' });
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ message: 'Email already exists' });
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({ 
      email, 
      password: hashedPassword, 
      role
    });
    
    // Generate token
    const token = generateToken(user);
    
    // Return user data without password
    const userData = {
      _id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile
    };
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: userData,
      token 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Email/Password Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });
    
    // Generate token
    const token = generateToken(user);
    
    // Return user data without password
    const userData = {
      _id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile,
      walletAddress: user.walletAddress
    };
    
    res.json({ 
      message: 'Login successful',
      user: userData,
      token 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get wallet nonce for signing
router.get('/wallet-nonce', async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({ message: 'Wallet address is required' });
    }
    
    // Normalize address
    const normalizedAddress = address.toLowerCase();
    
    // Find or create user by wallet address
    let user = await User.findOne({ walletAddress: normalizedAddress });
    
    if (!user) {
      // Create new user with wallet address
      user = await User.create({
        walletAddress: normalizedAddress,
        role: 'student', // Default role for wallet users
      });
    }
    
    // Return nonce for signing
    res.json({ 
      nonce: user.nonce,
      message: `Authenticate with CryptoCred: ${user.nonce}`
    });
  } catch (error) {
    console.error('Error getting wallet nonce:', error);
    res.status(500).json({ message: error.message });
  }
});

// Wallet authentication
router.post('/wallet-auth', async (req, res) => {
  try {
    const { address, signature } = req.body;
    

    console.log("Signer Address:", signature);
    console.log("Address:", address);
    if (!address || !signature) {
      return res.status(400).json({ message: 'Address and signature are required' });
    }
    
    // Normalize address
    const normalizedAddress = address.toLowerCase();
    
    // Find user by wallet address
    const user = await User.findOne({ walletAddress: normalizedAddress });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Construct the message that was signed
    const messageToSign = `Authenticate with CryptoCred: ${user.nonce}`;
    
    // Verify signature
    try {
      // Recover the address from the signature
      const signerAddress = ethers.utils.verifyMessage(messageToSign, signature);
      
      // Check if recovered address matches the claimed address
      if (signerAddress.toLowerCase() !== normalizedAddress) {
        return res.status(401).json({ message: 'Invalid signature' });
      }
    } catch (error) {
      console.error('Signature verification error:', error);
      return res.status(401).json({ message: 'Invalid signature' });
    }
    
    // Generate a new nonce for next login
    await user.generateNonce();
    
    // Generate token
    const token = generateToken(user);
    
    // Return user data
    const userData = {
      _id: user._id,
      role: user.role,
      profile: user.profile,
      walletAddress: user.walletAddress,
      email: user.email
    };
    
    res.json({ 
      message: 'Wallet authentication successful',
      user: userData,
      token 
    });
  } catch (error) {
    console.error('Wallet auth error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Connect wallet to existing account - requires authentication
router.post('/connect-wallet', auth(), async (req, res) => {
  try {
    const { address, signature } = req.body;
    const userId = req.user.id;
    
    if (!address || !signature) {
      return res.status(400).json({ message: 'Address and signature are required' });
    }
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if wallet already connected to another account
    const walletUser = await User.findOne({ 
      walletAddress: address.toLowerCase(),
      _id: { $ne: userId } // Not the current user
    });
    
    if (walletUser) {
      return res.status(400).json({ message: 'Wallet already connected to another account' });
    }
    
    // Verify signature
    const messageToSign = `Connect wallet to CryptoCred account: ${user.nonce}`;
    
    try {
      const signerAddress = ethers.utils.verifyMessage(messageToSign, signature);
      if (signerAddress.toLowerCase() !== address.toLowerCase()) {
        return res.status(401).json({ message: 'Invalid signature' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid signature' });
    }
    
    // Update user with wallet address
    user.walletAddress = address.toLowerCase();
    await user.save();
    
    // Generate new nonce
    await user.generateNonce();
    
    res.json({ 
      message: 'Wallet connected successfully',
      walletAddress: user.walletAddress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile - requires authentication
router.get('/me', auth(), async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).select('-password -nonce');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Role-specific routes
router.get('/student', auth(['student']), (req, res) => res.send('Hello Student'));
router.get('/recruiter', auth(['recruiter']), (req, res) => res.send('Hello Recruiter'));
router.get('/institute', auth(['institute']), (req, res) => res.send('Hello Institute'));

export default router;
