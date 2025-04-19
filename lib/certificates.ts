import { uploadToIPFS } from './ipfs'
import { hashFile } from './hash'

export async function processCertificateUpload(file: File) {
  const ipfsUrl = await uploadToIPFS(file)
  const fileHash = await hashFile(file)
  return { ipfsUrl, fileHash }
}
