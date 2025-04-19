export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { NFTStorage } from 'nft.storage'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const key = process.env.NFT_STORAGE_KEY?.trim()
  if (!key) {
    return NextResponse.json({ error: 'Missing NFT_STORAGE_KEY' }, { status: 500 })
  }

  try {
    const client = new NFTStorage({ token: key })
    const cid = await client.storeBlob(file)
    return NextResponse.json({ cid, url: `https://ipfs.io/ipfs/${cid}` }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
