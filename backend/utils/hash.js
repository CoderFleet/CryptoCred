// utils/hash.js
import fs from 'fs';
import crypto from 'crypto';

export async function hashFile(input) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');

    const stream = typeof input === 'string'
      ? fs.createReadStream(input)    // ✅ it's a file path
      : input;                         // ✅ it's already a stream

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
}
