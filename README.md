# 🛡️ CryptoCred

**A blockchain-based academic certificate storage and verification platform**  
No more fakes. No more middlemen. Just trustless, verifiable credentials.

![Banner](https://dummyimage.com/1000x300/1f1f1f/ffffff&text=CryptoCred+%F0%9F%9B%A1%EF%B8%8F+Academic+Cert+on+Chain)

---

## 🚀 What is CryptoCred?

CryptoCred is a decentralized platform where:

- 🎓 **Students** can upload academic certificates, stored on IPFS, hashed and anchored on the blockchain.
- 🏫 **Institutions** can issue verified certificates directly to wallets.
- 💼 **Recruiters** can verify the authenticity of certificates without relying on third parties.

All this happens securely on-chain, powered by NFTs and IPFS magic. ✨

---

## ⚙️ Tech Stack

| Layer        | Tech                                 |
|--------------|--------------------------------------|
| Frontend     | React (Vite), TailwindCSS, ShadCN UI |
| Wallet       | Wagmi + RainbowKit                   |
| Animations   | Framer Motion                        |
| Backend      | Node.js, Express                     |
| Blockchain   | Solidity, Hardhat, Polygon Mumbai    |
| Smart Contract | ERC-721 (Custom) + OpenZeppelin    |
| Storage      | NFT.storage (IPFS)                   |
| Auth (opt)   | Firebase or Supabase (email+wallet)  |
| Hashing      | SHA-256 (Node & Browser Crypto API)  |

---

## 🧭 User Flows

### 👨‍🎓 Student

- Connect Wallet
- Upload PDF Certificate
- Backend hashes file, uploads to IPFS, stores hash on-chain
- View and share verifiable public profile

### 🏫 Institution

- Register (pre-approved or admin-set)
- Upload student batch or individual certs
- Sign and issue via smart contract

### 🧑‍💼 Recruiter

- Visit student profile link
- View uploaded certificates
- Verify hash + IPFS integrity via on-chain data

---

## 🛠️ How It Works

1. **Hashing** – File is hashed with SHA-256.
2. **IPFS Upload** – File is uploaded to NFT.storage.
3. **Smart Contract** – Stores metadata: IPFS hash, file hash, timestamp.
4. **Verification** – Recruiters download cert, hash it, and compare with on-chain hash.  
   ✅ Match = legit  
   ❌ Mismatch = tampered

---

## 📦 Smart Contract Sample

```solidity
struct Certificate {
  string ipfsHash;
  string certHash;
  uint timestamp;
}

mapping(address => Certificate[]) public userCerts;

function issueCertificate(address user, string memory ipfsHash, string memory certHash) public onlyInstitute {
  userCerts[user].push(Certificate(ipfsHash, certHash, block.timestamp));
}
