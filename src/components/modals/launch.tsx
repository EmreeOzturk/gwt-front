import { useState } from 'react';
import InputText from '../tailwind/input';
import Loading from '../loading';
import { callBuyTokens, callClaimTokens } from '@/contractInteractions/launchpadInteractions/useAppContracts';
import { useAppDispatch, useAppSelector } from '@/hook/redux/hooks';
import { selectData, setLoading } from '@/redux/auth/auth';
import { callDepositFund } from '@/contractInteractions/fundRaiserInteractions/useAppContracts';
import { ToastSuccess } from '../alert/SweatAlert';
import { TetherTokenIcon } from '../icons/tokens';

export default function LaunchModal({ token }: { token: any }) {
  const [amount, setAmount] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectData);

  return (
    <div className='flex flex-col justify-between items-center h-full xl:min-h-[40vh] text-white backdrop-blur-sm bg-white/10 border-2 border-white/30 rounded-b-xl shadow-md w-full gap-10  p-6 '>
      <div className='w-full flex flex-col gap-6 h-full justify-between'>
        <div className='border p-6 rounded-md border-white/60'>
          <h4>Amount of Payment</h4>
          <div className='flex gap-4 items-center'>
            <InputText type='text' value={amount} onChange={(e: any) => setAmount(Number(e.target.value))} addClass='text-right' placeholder='Amount 0.00' />

            <div className='flex gap-2 items-center shrink-0'>
              <TetherTokenIcon className='w-8 h-8' />
            </div>
          </div>
        </div>
        <button
          onClick={async () => {
            try {
              dispatch(setLoading(true));
              //await callBuyTokens(token.contract, amount || 0);
              let res = await callDepositFund(amount || 0);
              let hash = res.hash;
              ToastSuccess({
                tHashLink: hash,
              }).fire({
                icon: 'success',
                text: 'Transaction successful',
              });
            } catch (error) {
              console.log(error);
            } finally {
              dispatch(setLoading(false));
            }
          }}
          disabled={!amount || amount <= 0 || loading}
          className='bg-purple hover:opacity-95 text-white rounded-lg py-3 disabled:opacity-70 disabled:cursor-not-allowed gap-3 w-full flex justify-center items-center'
        >
          Buy {loading && <Loading />}
        </button>
      </div>
      <div className=' w-full  flex-col gap-3 hidden'>
        <h1 className='text-2xl text-center w-full'>Next claim in 1 day</h1>
        <button
          onClick={async () => {
            dispatch(setLoading(true));
            await callClaimTokens(token.contract);
            dispatch(setLoading(false));
          }}
          disabled={loading}
          className='bg-purple hover:opacity-95 text-white rounded-lg py-3 disabled:opacity-70 disabled:cursor-not-allowed gap-3 w-full flex justify-center items-center'
        >
          Claim {loading && <Loading />}
        </button>
      </div>
    </div>
  );
}
