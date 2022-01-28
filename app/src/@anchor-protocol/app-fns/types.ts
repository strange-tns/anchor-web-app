import {
  ANC,
  AncUstLP,
  aUST,
  Eth,
  bEth,
  bLuna,
  bLunaLunaLP,
  Luna,
  Eth,
  bEth,
  Rate,
  u,
  UST,
} from '@anchor-protocol/types';

//export interface AnchorConstants {
//  gasWanted: Gas;
//  fixedGas: Gas;
//  airdropGasWanted: Gas;
//  airdropGas: Gas;
//  //fixedGas: u<UST<number>>;
//  blocksPerYear: number;
//  gasAdjustment: Rate<number>;
//}

/**
 * You can cast the token values as nominal types
 *
 * @example
 * ```
 * // const { tokenBalances: { uUST } } = useBank() // Record<string, string>
 * const { tokenBalances: { uUST } } = useBank<AnchorTokens>() // { uUST: uUST }
 * ```
 */
export interface AnchorTokenBalances {
  uUST: u<UST>;
  uaUST: u<aUST>;
  uLuna: u<Luna>;
  ubLuna: u<bLuna>;
  uEth: u<Eth>;
  ubEth: u<bEth>;
  uANC: u<ANC>;
  uAncUstLP: u<AncUstLP>;
  ubLunaLunaLP: u<bLunaLunaLP>;
}

export const DefaultAnchorTokenBalances = {
  uUST: '0' as u<UST>,
  uaUST: '0' as u<aUST>,
  uLuna: '0' as u<Luna>,
  ubLuna: '0' as u<bLuna>,
  uEth: '0' as u<Eth>,
  ubEth: '0' as u<bEth>,
  uANC: '0' as u<ANC>,
  uAncUstLP: '0' as u<AncUstLP>,
  ubLunaLunaLP: '0' as u<bLunaLunaLP>,
};

/**
 * You can cast the tax values as nominal types
 *
 * @example
 * ```
 * // const { tax: { taxRate, maxTaxUUSD } } = useBank() // { taxRate: string, maxTaxUUSD: string }
 * const { tax: { taxRate, maxTaxUUSD } } = useBank<any, AnchorTax>() // { taxRate: Rate, maxTaxUUSD: uUST }
 * ```
 */
export interface AnchorTax {
  taxRate: Rate;
  maxTaxUUSD: u<UST>;
}

//export interface ExpandAddressMap extends AddressMap {
//  terraswapFactory: string;
//}
