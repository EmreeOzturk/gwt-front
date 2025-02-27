
import { callFundRaisingContract, callERC20Contract } from './ethereumContracts';

//Approve for payment token
let tokenAddress = process.env.NEXT_PUBLIC_TOKEN as string;

export const callApprovePaymentToken = async (amount: number | string) => {
  const { Address } = await callFundRaisingContract();
  const { contractWithSigner } = await callERC20Contract(tokenAddress);
  const approvePaymentToken = await contractWithSigner.approve(Address, amount);
  await approvePaymentToken.wait();
  return approvePaymentToken;
};

//Fund Raising Contract Interactions
export const callDepositFund = async (amount: number | string) => {
  let decimals = Number(await callGetDecimals(tokenAddress));
  const totalAmount = Number(amount) * Math.pow(10, decimals);
  const firstTx = await callApprovePaymentToken(totalAmount.toLocaleString('fullwide', { useGrouping: false }));
  firstTx.wait();
  const { contractWithSigner } = await callFundRaisingContract();
  const depositFund = await contractWithSigner.depositFund(totalAmount);
  await depositFund.wait();
  let hash = depositFund.hash;
  return {
    hash,
  };
};

export const callFundOf = async (address: string) => {
  const { contractWithSigner } = await callFundRaisingContract();
  const fundOf = await contractWithSigner.fundOf(address);
  return fundOf;
};

export const callGetAllFundOwnersInfo = async () => {
  const { contractWithSigner } = await callFundRaisingContract();
  const getAllFundOwnersInfo = await contractWithSigner.getAllFundOwnersInfo();
  return getAllFundOwnersInfo;
};

export const callGetDecimals = async (address: string) => {
  const { contractWithSigner } = await callERC20Contract(address);
  const getDecimals = await contractWithSigner.decimals();
  return getDecimals;
};
