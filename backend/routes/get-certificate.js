import express from 'express';
import contract from '../utils/contract.js';

const router = express.Router();

router.get('/:wallet', async (req, res) => {
  const { wallet } = req.params;

  try {
    const certs = await contract.getCertificates(wallet);
    res.status(200).json(certs);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

export default router;
