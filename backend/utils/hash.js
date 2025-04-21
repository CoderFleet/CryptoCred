import fs from 'fs';
import crypto from 'crypto';

export async function hashFile(input) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');

    if (Buffer.isBuffer(input)) {
      // If input is a buffer, hash it directly
      hash.update(input);
      return resolve(hash.digest('hex'));
    }

    // If input is a file path (string), create a read stream
    const stream = fs.createReadStream(input);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
}
