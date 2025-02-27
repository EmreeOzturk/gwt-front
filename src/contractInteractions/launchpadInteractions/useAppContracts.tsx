import { ToastError, ToastSuccess } from "@/components/alert/SweatAlert";
import { callLaunchpadContract, callERC20Contract } from "./ethereumContracts";

//User side functions to interact with the contract
export const callBuyTokens = async (
  saleTokenAddress: string,
  amount: number | string
) => {
  try {
    const price = await callGetPrice(saleTokenAddress);
    const totalAmount = Number(price) * Number(amount);
    const firstTx = await callApprovePaymentToken(
      totalAmount.toLocaleString("fullwide", { useGrouping: false }),
      saleTokenAddress
    );
    firstTx.wait();
    const decimal = await callGetDecimals(saleTokenAddress);
    const { contractWithSigner } = await callLaunchpadContract();
    amount = Number(amount) * 10 ** Number(decimal);
    const buyTokens = await contractWithSigner.buyTokens(
      saleTokenAddress,
      amount.toLocaleString("fullwide", { useGrouping: false })
    );
    await buyTokens.wait();
    const hash = buyTokens.hash;
    ToastSuccess({
      tHashLink: hash,
    }).fire({
      icon: "success",
      text: "Transaction successful",
    });

    return buyTokens;
  } catch (error) {
    console.log(error);
    ToastError.fire({
      title: "Transaction failed",
    });
  }
};

export const callClaimTokens = async (saleTokenAddress: string) => {
  try {
    const { contractWithSigner } = await callLaunchpadContract();
    const claimTokens = await contractWithSigner.claimTokens(saleTokenAddress);
    await claimTokens.wait();
    const hash = claimTokens.hash;
    ToastSuccess({
      tHashLink: hash,
    }).fire({
      icon: "success",
      text: "Transaction successful",
    });
    return claimTokens;
  } catch (error) {
    console.log(error);
    ToastError.fire({
      title: "Transaction failed",
    });
  }
};

//Admin side functions to interact with the contract
export const callAdminSetSaleStatus = async (
  saleTokenAddress: string,
  status: boolean
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const setSaleStatus = await contractWithSigner.setSaleIsActive(
    saleTokenAddress,
    status
  );
  return setSaleStatus;
};

export const callAdminClaimPaymentTokens = async (
  saleTokenAddress: string,
  reciever: string,
  amount: number
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const claimPaymentTokens = await contractWithSigner.callClaimPaymentToken(
    saleTokenAddress,
    reciever,
    amount
  );
  return claimPaymentTokens;
};

export const callAdminClaimSaleTokens = async (
  saleTokenAddress: string,
  reciever: string,
  amount: number
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const callClaimSaleTokens = await contractWithSigner.callClaimSaleToken(
    saleTokenAddress,
    reciever,
    amount
  );
  return callClaimSaleTokens;
};

export const callAdminTransferOwnershipOfASale = async (
  saleTokenAddress: string,
  newOwner: string
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const transferOwnership = await contractWithSigner.callTransferOwnership(
    saleTokenAddress,
    newOwner
  );
  return transferOwnership;
};

//System Admin Functions
export const callAdminCreateLaunchpad = async (
  saleOwner: string,
  saleTokenAddress: string,
  paymentTokenAddress: string,
  tokenPrice: number,
  vestingStart: number,
  vestingEnd: number,
  vestingPeriod: number
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const createLaunchpad = await contractWithSigner.createLaunchpad(
    saleOwner,
    saleTokenAddress,
    paymentTokenAddress,
    tokenPrice,
    vestingStart,
    vestingEnd,
    vestingPeriod
  );
  return createLaunchpad;
};

export const callAdminChangeSystemAdmin = async (newAdmin: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const changeSystemAdmin = await contractWithSigner.changeSystemAdmin(
    newAdmin
  );
  return changeSystemAdmin;
};

//View Functions
export const callTotalTokenSold = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const totalTokenSold = await contractWithSigner.callTotalTokenSold(
    saleTokenAddress
  );
  return totalTokenSold;
};

export const callGetAllVestingInfos = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getAllVestingInfos = await contractWithSigner.getAllVestingInfos(
    saleTokenAddress
  );
  return getAllVestingInfos;
};

export const callGetPrice = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getPrice = await contractWithSigner.getPrice(saleTokenAddress);
  return getPrice;
};

export const callGetSaleIsActive = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getSaleIsActive = await contractWithSigner.getSaleIsActive(
    saleTokenAddress
  );
  return getSaleIsActive;
};

export const callGetVestingEndTime = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getVestingEndTime = await contractWithSigner.getVestingEndTime(
    saleTokenAddress
  );
  return getVestingEndTime;
};

export const callGetVestingStartTime = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getVestingStartTime = await contractWithSigner.getVestingStartTime(
    saleTokenAddress
  );
  return getVestingStartTime;
};

export const callGetVestingPeriodDuration = async (
  saleTokenAddress: string
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getVestingPeriod = await contractWithSigner.getVestingPeriodDuration(
    saleTokenAddress
  );
  return getVestingPeriod;
};

export const callGetVestingInfo = async (
  saleTokenAddress: string,
  userAddress: string
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getVestingInfo = await contractWithSigner.getVestingInfo(
    saleTokenAddress,
    userAddress
  );
  return getVestingInfo;
};

export const callIsBeneficiary = async (
  saleTokenAddress: string,
  userAddress: string
) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const isBeneficiary = await contractWithSigner.isBeneficiary(
    saleTokenAddress,
    userAddress
  );
  return isBeneficiary;
};

export const callLAunchpadByToken = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const launchpadByToken = await contractWithSigner.launchpadByToken(
    saleTokenAddress
  );
  return launchpadByToken;
};

export const callGetDecimals = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callERC20Contract(saleTokenAddress);
  const getDecimals = await contractWithSigner.decimals();
  return getDecimals;
};

export const callGetSaleOwner = async (saleTokenAddress: string) => {
  const { contractWithSigner } = await callLaunchpadContract();
  const getSaleOwner = await contractWithSigner.getSaleOwner(saleTokenAddress);
  return getSaleOwner;
};

//Approve for payment token
export const callApprovePaymentToken = async (
  amount: number | string,
  saleToken: string
) => {
  const Address = await callLAunchpadByToken(saleToken);
  let address = process.env
    .NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT_ADDRESS as string;
  const { contractWithSigner } = await callERC20Contract(address);
  const approvePaymentToken = await contractWithSigner.approve(Address, amount);
  await approvePaymentToken.wait();
  return approvePaymentToken;
};
