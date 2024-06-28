import { ethers, Network } from "@dhedge/v2-sdk";
import { poolAddress } from "./config";
console.log('load env');
require("dotenv").config();

export const wallet = (network: Network): ethers.Wallet => {
  let url;
  switch (network) {
    case "arbitrum":
      url = `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
      break;
    default:
      throw new Error("network not supported");
  }

  return new ethers.Wallet(process.env.PRIVATE_KEY as string, new ethers.providers.JsonRpcProvider(url));
};

export const checkPoolExistence = async (poolAddress: string, network: Network) => {
  try {
    const mywallet = wallet(network);
    const provider = mywallet.provider;
    const code = await provider.getCode(poolAddress);
    // console.log("code ",code)
    if (code === '0x') {
      console.log('No contract found at address:', poolAddress);
    } else {
      console.log('Contract found at address:', poolAddress);
    }
  } catch (error) {
    console.error('Failed to check pool existence:', error);
  }
};

// Example usage:
checkPoolExistence(poolAddress, Network.ARBITRUM);