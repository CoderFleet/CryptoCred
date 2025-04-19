require("dotenv").config();
const hre = require("hardhat");

async function main() {
  // Compile and get the contract factory
  const CertificateIssuer = await hre.ethers.getContractFactory("CertificateIssuer");

  // Deploy the contract
  const certificateIssuer = await CertificateIssuer.deploy();

  // Wait until it's mined
  await certificateIssuer.waitForDeployment(); // ✅ use this instead of .deployed()

  // Log the deployed address
  console.log("✅ Contract deployed to:", await certificateIssuer.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
