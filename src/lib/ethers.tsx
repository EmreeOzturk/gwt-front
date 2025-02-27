import { ethers } from 'ethers';

export default function Ethers() {
  let provider: any;
  let ethereum: any;
  if (typeof window !== 'undefined') {
    ethereum = (window as any).ethereum;
    provider = new ethers.BrowserProvider(window.ethereum);
  }
  return { provider, ethereum, ethers };
}
