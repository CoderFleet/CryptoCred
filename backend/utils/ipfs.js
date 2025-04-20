import fs from 'fs';
import path from 'path';
import pinataSDK from '@pinata/sdk';
import pRetry from 'p-retry';
import { Readable } from 'stream';

// Use your actual Pinata credentials
const pinata = new pinataSDK(process.env.YOUR_PINATA_API_KEY, process.env.YOUR_PINATA_API_SECRET);

export async function uploadToIPFS(fileBuffer, originalName = 'file.pdf') {
  const fileName = path.basename(originalName);

  const uploadFileWithRetry = async () => {
    console.log('Uploading file to Pinata...');
    
    // Convert buffer to stream for pinFileToIPFS
    const readableStream = Readable.from(fileBuffer);

    try {
      const result = await pinata.pinFileToIPFS(readableStream, {
        pinataMetadata: {
          name: fileName,
        },
      });

      return result.IpfsHash;
    } catch (err) {
      console.error('[Pinata Upload Attempt Error]', err?.message || err);
      // Wrap non-error objects
      throw new Error(err?.message || JSON.stringify(err));
    }
  };

  try {
    const cid = await pRetry(uploadFileWithRetry, {
      retries: 3,
      minTimeout: 1000,
      onFailedAttempt: (error) => {
        console.warn(`Attempt #${error.attemptNumber} failed. Retrying...`);
      },
    });

    console.log('✅ File uploaded with CID:', cid);
    return cid;
  } catch (err) {
    console.error('❌ Final upload failed:', err.message);
    throw new Error('Upload failed after retries');
  }
}
