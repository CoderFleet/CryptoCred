import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from dotenv;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
