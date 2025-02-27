import { ethers } from 'ethers';
import  launchpadABI from '@/abi/launchpadABI.json';
import erc20ABI from '@/abi/token.json';

export const callLaunchpadContract = async () => {
    let ethereum = (window as any).ethereum;
    await ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const abi = launchpadABI;
    const Address = process.env.NEXT_PUBLIC_LAUNCHPAD_FACTORY_CONTRACT_ADDRESS as string;
    const launcpadContract = new ethers.Contract(Address, abi, signer);
    const contractWithSigner:any = launcpadContract.connect(signer);
    return { contractWithSigner, Address, abi };
  };

  export const callERC20Contract = async (address: string) => {
    let ethereum = (window as any).ethereum;
    await ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const abi = erc20ABI;
    const Address = address;
    const erc20Contract = new ethers.Contract(Address, abi, signer);
    const contractWithSigner:any = erc20Contract.connect(signer);
    return { contractWithSigner, Address, abi };
  };