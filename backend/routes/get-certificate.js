import { ethers } from 'ethers';
import express from 'express';
import abi from '../abis/abi.js'; // Make sure this includes `getCertificates`

const router = express.Router();

const provider = new ethers.providers.JsonRpcProvider(process.env.ALMOY_API_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, abi, provider);
console.log('[CONTRACT ADDRESS]', contractAddress);

router.get('/:wallet', async (req, res) => {
  const { wallet } = req.params;

  if (!ethers.utils.isAddress(wallet)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    console.log(`Fetching certificates for wallet: ${wallet}`);

    // Optional: Check if contract is deployed at address
    const code = await provider.getCode(contractAddress);
    if (code === '0x') {
      throw new Error('No contract deployed at given address');
    }

    const certs = await contract.getCertificates(wallet);

    console.log('Certificates:', certs);
    res.status(200).json(certs);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      error: 'Failed to fetch certificates',
      message: error.message,
      code: error.code,
      method: error.method,
    });
  }
});

export default router;
