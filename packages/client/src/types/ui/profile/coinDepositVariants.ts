import { CoinType } from '@betnomi/libs/types';

enum TokenType {
  BEP20 = 'BEP20',
  ERC20 = 'ERC20',
  TRC20 = 'TRC20',
  BTC = 'BTC',
}

export type Variant = {
  type: TokenType,
  value: CoinType | string,
  averageTime: number,
};

export const CoinDepositVariants: Record<CoinType, Variant[]> = {
  [CoinType.ethereum]: [{ type: TokenType.ERC20, value: CoinType.ethereum, averageTime: 1 }], 
  [CoinType.binancecoin]: [{ type: TokenType.ERC20, value: CoinType.binancecoin, averageTime: 1 }],
  [CoinType.bitcoin]: [{ type: TokenType.BTC, value: CoinType.bitcoin, averageTime: 1 }],
  [CoinType.bitcoincash]: [{ type: TokenType.ERC20, value: CoinType.bitcoincash, averageTime: 1 }],
  [CoinType.dash]: [{ type: TokenType.ERC20, value: CoinType.dash, averageTime: 1 }],
  [CoinType.doge]: [{ type: TokenType.ERC20, value: CoinType.doge, averageTime: 1 }],
  [CoinType.litecoin]: [{ type: TokenType.ERC20, value: CoinType.litecoin, averageTime: 1 }],
  [CoinType.ripple]: [{ type: TokenType.ERC20, value: CoinType.ripple, averageTime: 1 }],
  [CoinType.tether]: [
    { type: TokenType.ERC20, value: CoinType.tether, averageTime: 1 },
    { type: TokenType.BEP20, value: 'USDT_BEP20', averageTime: 1 },
    { type: TokenType.TRC20, value: 'USDT_TRC20', averageTime: 1 },
  ],
  [CoinType.tron]: [{ type: TokenType.ERC20, value: CoinType.tron, averageTime: 1 }],
  [CoinType.zcash]: [{ type: TokenType.ERC20, value: CoinType.zcash, averageTime: 1 }],
  [CoinType.erc20]: [{ type: TokenType.ERC20, value: CoinType.erc20, averageTime: 1 }],
  [CoinType.bep20]: [{ type: TokenType.BEP20, value: CoinType.bep20, averageTime: 1 }],
  [CoinType.trc20]: [{ type: TokenType.TRC20, value: CoinType.trc20, averageTime: 1 }],

};
