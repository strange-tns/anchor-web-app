import { uToken } from '../../currencies';
import { HumanAddr } from '../common';

export interface Balance {
  balance: {
    address: HumanAddr;
  };
}

export interface BalanceResponse {
  balance: uToken;
}
