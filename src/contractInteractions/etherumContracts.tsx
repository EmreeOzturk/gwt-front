import { ethers } from "ethers";
import MarketAbi from "../abi/marketplace.json";
import nftAbi from "../abi/nft.json";
import tokenAbi from "../abi/token.json";
declare global {
  interface Window {
    ethereum: any;
  }
}
const alchemyRpcUrl = "https://polygon-mainnet.g.alchemy.com/v2/2nUFfGpT9YFqBrhCq2v7PvtRRqmHckca"


export const callNFTContract = async () => {
  const metamaskAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const msgSender = metamaskAddress[0];
  const provider = new ethers.BrowserProvider(window.ethereum);//JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2nUFfGpT9YFqBrhCq2v7PvtRRqmHckca");
  const signer =await provider.getSigner();
  const abi = nftAbi;
  const NFTContractAddress = process.env.NEXT_PUBLIC_CONTRACT as string;
  const NFTContract = new ethers.Contract(NFTContractAddress, abi, signer);
  const contractWithSigner:any = NFTContract.connect(signer);
  return { contractWithSigner, NFTContractAddress, abi, msgSender };
};
export const callTokenContract = async () => {
  const metamaskAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const msgSender = metamaskAddress[0];
  const provider = new ethers.BrowserProvider(window.ethereum) 
  const signer =await provider.getSigner();
  const abi = tokenAbi;
  const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN as string;
  const tokenContract = new ethers.Contract(tokenContractAddress, abi, signer);
  const contractWithSigner:any = tokenContract.connect(signer);
  return { contractWithSigner, tokenContractAddress, abi, msgSender };
};

export const callMarketplaceContract = async () => {
  const metamaskAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const msgSender = metamaskAddress[0];
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer =await provider.getSigner();
  const abi = MarketAbi;
  const marketplaceContractAddress = process.env
    .NEXT_PUBLIC_MARKETPLACE as string;
  const marketplaceContract = new ethers.Contract(
    marketplaceContractAddress,
    abi,
    signer
  );
  const contractWithSigner:any = marketplaceContract.connect(signer);
  return { contractWithSigner, marketplaceContract, abi, msgSender };
};
