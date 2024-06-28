import {ethers, Network, SupportedAsset } from "@dhedge/v2-sdk";

import { poolAddress } from "./config";
import { dhedge } from "./dhdge";

const ethersTokenAddress = '0x302cD8973bE5CA2334B4ff7e7b01BA41455559b3'
const TetherTokenAddress = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
    // Perform a simple trade
const tradeAmount = ethers.utils.parseUnits("1", "ether"); // Trading 1 ETH
const minReceived = ethers.utils.parseUnits("2400", "mwei"); // Minimum USDT received, assuming a rate of 1 ETH = 2400 USDT

async function main() {
 
    try {
        let network = Network.ARBITRUM;
        const options = {
            gasLimit: 1000000 // Set a higher gas limit than you estimate might be necessary
          };
        // const pool = await dhedge(network).createPool(
        // 'manager',
        // 'poolName',
        // 'symbol',
        // [[ethersTokenAddress,true],[TetherTokenAddress,false]],
        // 20,
        // options
        // );
        // console.log(pool.address)
        const pool =await dhedge(network).loadPool(poolAddress)
        const composition = await pool.getComposition();
        console.log(composition)
        console.log(pool)
        // const tradeTransaction = pool.trade(
        //     ethersTokenAddress, // From Token
        //     TetherTokenAddress, // To Token
        //     tradeAmount, // Amount of ETH to trade
        //     minReceived, // Minimum amount of USDT to receive
        //     options
        //   );

    } catch (err) {
        console.log(err)
    }
    
}
main();