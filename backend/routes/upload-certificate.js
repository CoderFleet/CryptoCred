import express from 'express';
import { hashFile } from '../utils/hash.js';
import { uploadToIPFS } from '../utils/ipfs.js';
import contract from '../utils/contract.js';
import formidable from 'formidable';
import {ethers} from 'ethers';
const router = express.Router();

// In your router code
router.post('/', async (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('[Formidable Error]', err);
      return res.status(400).json({ error: 'Failed to parse form data' });
    }

    const userAddress = Array.isArray(fields.userAddress)
      ? fields.userAddress[0]
      : fields.userAddress;

    const certificateFile = files.certificateFile?.[0]; // use [0] if it's an array

    console.log('[User Address]', userAddress); 
    console.log('[Certificate File]', certificateFile);

    if (!userAddress || !certificateFile) {
      return res.status(400).json({ error: 'Missing userAddress or certificateFile' });
    }

    const filePath = certificateFile.filepath;

    try {
      console.log('Hashing file...');
      const certHash = await hashFile(filePath);
      console.log('File hashed:', certHash);

      console.log('Uploading to IPFS...');
      const ipfsHash = await uploadToIPFS(filePath);
      console.log('IPFS upload successful, IPFS Hash:', ipfsHash);

      // Ensure the address is a proper checksum address without ENS resolution
      const formattedAddress = ethers.getAddress(userAddress);
      
      console.log('Issuing certificate...');
      const tx = await contract.issueCertificate(formattedAddress, ipfsHash, certHash);
      console.log('Transaction sent, waiting for confirmation...');
      await tx.wait();
      console.log('Transaction confirmed with hash:', tx.hash);

      res.status(200).json({
        message: 'Certificate issued successfully!',
        contractAddress: contract.address,
        userAddress: formattedAddress,
        transactionHash: tx.hash,
        ipfsHash,
        certHash,
      });
    } catch (error) {
      console.error('[Issue Error]', error);
      res.status(500).json({
        error: 'Failed to issue certificate',
        message: error.message,
        stack: error.stack,
      });
    }
  });
});

export default router;
