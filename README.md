# 🛡️ CryptoCred

**A blockchain-based academic certificate storage and verification platform**  
No more fakes. No more middlemen. Just trustless, verifiable credentials.

![Built at Hack36](https://postimage.me/images/2025/04/19/built-at-hack36.png)

---

## 🧠 Team Info

**Team Name**: npm -D coders 
**Track**: Defending the Digital Frontier, Fintech and Blockchain

### 👥 Team Members
- Rudransh Pratap Singh
- Shreeya Srivastava
- Gaurav Mishra
- Devansh Jain

---

## 🚀 What is CryptoCred?

CryptoCred is a decentralized platform where:

- 🎓 **Students** can upload academic certificates, stored on IPFS, hashed and anchored on the blockchain.
- 🏫 **Institutions** can issue verified certificates directly to wallets.
- 💼 **Recruiters** can verify the authenticity of certificates without relying on third parties.

All this happens securely on-chain, powered by NFTs and IPFS magic. ✨

---

## 🎯 Problem Statement & Importance

Academic fraud and fake degrees are a massive problem worldwide. Recruiters and institutions waste valuable resources verifying credentials.  
CryptoCred eliminates these issues by creating a trustless, immutable, and decentralized system for certificate issuance and verification.

This system ensures:

- ✅ Authenticity of documents
- 🔒 Tamper-proof records
- 🌐 Instant and permissionless verification

---

## ⚙️ Tech Stack

| Layer         | Tech Stack                                                                 |
|---------------|-----------------------------------------------------------------------------|
| Frontend      | Next.js 15, React 19, TailwindCSS 4, ShadCN UI, clsx, tailwind-merge       |
| Wallet        | wagmi v2 + RainbowKit                                                      |
| Blockchain    | Solidity (ERC-721), Hardhat, viem, ethers v6, Polygon Mumbai               |
| Animations    | Framer Motion,                                            |
| UI Icons      | Lucide React                                                               |
| Backend       | Node.js, Express, Mongoose, Formidable                                     |
| Storage       | Pinata, form-data                                              |
| Auth (Optional)| MongoDB                                      |
| Hashing       | SHA-256 (Browser + Node.js Crypto APIs)                                    |
| Dev Tools     | TypeScript, Eslint, dotenv                                                 |

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

## 📽️ Demo & Presentation

- **Video Demo**: 

https://github.com/user-attachments/assets/07a17c5a-478b-4897-a730-ae90e838f828


- **Presentation**: [Link to public presentation deck]

---

> “Code speaks louder than certificates... but why not both?” 😎
