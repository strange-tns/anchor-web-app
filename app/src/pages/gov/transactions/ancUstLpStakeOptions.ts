//import { fabricateStakingBond } from '@anchor-protocol/anchor.js';
import { AddressProvider } from '@anchor-protocol/anchor.js';
import { createHookMsg } from '@anchor-protocol/anchor.js/dist/utils/cw20/create-hook-msg';
import { validateInput } from '@anchor-protocol/anchor.js/dist/utils/validate-input';
import { validateAddress } from '@anchor-protocol/anchor.js/dist/utils/validation/address';
import {
  createOperationOptions,
  merge,
  OperationDependency,
  timeout,
} from '@anchor-protocol/broadcastable-operation';
import { Dec, Int, MsgExecuteContract, StdFee } from '@terra-money/terra.js';
import { renderBroadcastTransaction } from 'components/TransactionRenderer';
import { createContractMsg } from 'transactions/createContractMsg';
import { createOptions } from 'transactions/createOptions';
import { getTxInfo } from 'transactions/getTxInfo';
import { pickEmptyResult } from 'transactions/pickEmptyResult';
import { postContractMsg } from 'transactions/postContractMsg';
import { parseTxResult } from 'transactions/tx';

export const ancUstLpStakeOptions = createOperationOptions({
  id: 'gov/ancUstLpStake',
  //broadcastWhen: 'always',
  pipe: ({
    addressProvider,
    post,
    client,
    signal,
    fixedGas,
    gasFee,
    gasAdjustment,
  }: OperationDependency<{}>) => [
    fabricateStakingBond, // Option -> ((AddressProvider) -> MsgExecuteContract[])
    createContractMsg(addressProvider), // -> MsgExecuteContract[]
    createOptions(() => ({
      fee: new StdFee(gasFee, fixedGas + 'uusd'),
      gasAdjustment,
    })), // -> CreateTxOptions
    timeout(postContractMsg(post), 1000 * 60 * 20), // -> Promise<StringifiedTxResult>
    parseTxResult, // -> TxResult
    merge(getTxInfo(client, signal), () => ({ fixedGas })), // -> { TxResult, TxInfo, fixedGas }
    pickEmptyResult, // -> TransactionResult
  ],
  renderBroadcast: renderBroadcastTransaction,
  //breakOnError: true,
});

interface Option {
  address: string;
  amount: string;
}

export const fabricateStakingBond = ({ address, amount }: Option) => (
  addressProvider: AddressProvider,
): MsgExecuteContract[] => {
  validateInput([validateAddress(address)]);

  const anchorToken = addressProvider.terraswapAncUstLPToken();

  return [
    new MsgExecuteContract(address, anchorToken, {
      send: {
        contract: addressProvider.staking(),
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        msg: createHookMsg({
          bond: {},
        }),
      },
    }),
  ];
};
