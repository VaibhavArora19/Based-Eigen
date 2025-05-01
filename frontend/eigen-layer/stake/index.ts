import { delegationManagerAbi } from "@/abis/delegation-manager";
import { erc20Abi } from "@/abis/erc20-abi";
import { strategyManagerAbi } from "@/abis/strategy-manager";
import { delegationManager, erc20ContractAddress, strategyManager, wethStrategyAddress } from "@/constants";
import { ethers } from "ethers";

export const stake = async (amount: string) => {
  try {
    //@ts-ignore
    const provider = new ethers.JsonRpcProvider(window?.ethereum);

    const signer = await provider.getSigner();

    const erc20Contract = new ethers.Contract(erc20ContractAddress, erc20Abi, signer);

    await erc20Contract.approve(strategyManager, amount);

    const contract = new ethers.Contract(strategyManager, strategyManagerAbi, signer);

    const tx = await contract.depositIntoStrategy(wethStrategyAddress, erc20ContractAddress, amount);

    await tx.wait();
  } catch (error) {
    console.log("error: ", error);
  }
};

export const stakeAndDelegate = async (amount: string, operator: string) => {
  try {
    await stake(amount);

    //@ts-ignore
    const provider = new ethers.JsonRpcProvider(window?.ethereum);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(delegationManager, delegationManagerAbi, signer);

    const tx = await contract.delegateTo(
      operator,
      { signature: "0x", expiry: 0 },
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );

    await tx.wait();
  } catch (error) {
    console.log("error: ", error);
  }
};
