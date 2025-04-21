import { ethers } from 'ethers';
import axios from 'axios'; // To fetch data from IPFS
import { hashFile } from '../utils/hash.js'; // Your hash calculation utility
import express from 'express';
import abi from '../abis/abi.js'; // Contract ABI

const router = express.Router();

const provider = new ethers.providers.JsonRpcProvider(process.env.ALMOY_API_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, abi, provider);

router.get('/:wallet', async (req, res) => {
  const { wallet } = req.params;

  if (!ethers.utils.isAddress(wallet)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    console.log(`Fetching certificates for wallet: ${wallet}`);

    // Fetch certificates from the contract
    const certs = await contract.getCertificates(wallet);

    if (!certs || certs.length === 0) {
      return res.status(404).json({ error: 'No certificates found for this wallet.' });
    }

    const verificationResults = [];

    // Loop through all certificates and verify them
    for (let cert of certs) {
      // Fetch certificate file from IPFS
      const ipfsUrl = `https://scarlet-top-junglefowl-952.mypinata.cloud/ipfs/${cert.ipfsHash}`;
      const response = await axios.get(ipfsUrl, { responseType: 'arraybuffer' });
      const fileBuffer = Buffer.from(response.data);

      // Calculate the file hash
      const calculatedHash = await hashFile(fileBuffer);
    console.log('Calculated Hash:', calculatedHash);
      // Compare it to the on-chain certHash
      const isVerified = calculatedHash === cert.certHash;
      console.log(calculatedHash);
      console.log(cert.certHash);
      verificationResults.push({
        ipfsHash: cert.ipfsHash,
        certHash: cert.certHash,
        calculatedHash,
        verified: isVerified,
        timestamp: cert.timestamp,
      });
    }

    // Send verification results
    res.status(200).json({ wallet, certificates: verificationResults });

  } catch (error) {
    console.error('Error verifying certificates:', error);
    res.status(500).json({
      error: 'Failed to verify certificates',
      message: error.message,
      stack: error.stack,
    });
  }
});

export default router;
