// utils/contract.js
import { ethers } from 'ethers';
import contractABI from '../abis/abi.js';

// Setup the provider and signer
const provider = new ethers.JsonRpcProvider(process.env.ALMOY_API_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create a contract instance
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  signer
);

export default contract;
