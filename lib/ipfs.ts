// import { NFTStorage, File } from 'nft.storage'

// console.log('NFT_STORAGE_KEY:', process.env.NFT_STORAGE_KEY)
// const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! })

// export async function uploadToIPFS(file: File) {
//   const cid = await client.storeBlob(file)
//   return `https://ipfs.io/ipfs/${cid}`
// }

import { NFTStorage } from 'nft.storage'

const key = process.env.NFT_STORAGE_KEY?.trim()
console.log('[IPFS] Using API Key:', key?.slice(0, 10), '...')

const client = new NFTStorage({ token: key! })

export async function uploadToIPFS(file: File) {
  try {
    console.log('[IPFS] Uploading file...')
    console.log('[IPFS] File type:', typeof file, file instanceof Blob);
    const cid = await client.storeBlob(file)
    console.log('[IPFS] Uploaded, CID:', cid)
    return `https://ipfs.io/ipfs/${cid}`
  } catch (err) {
    console.error('[IPFS] Upload error:', err)
    throw err
  }
}