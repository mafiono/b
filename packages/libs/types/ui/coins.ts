export enum CoinType {
  bitcoin = 'BTC',
  ethereum = 'ETH',
  bitcoincash = 'BCH',
  litecoin = 'LTC',
  binancecoin = 'BNB',
  ripple = 'XRP',
  doge = 'DOGE',
  tron = 'TRX',
  tether = 'USDT',
  dash = 'DASH',
  zcash = 'ZEC',
  erc20 = 'ERC20',
  bep20 = 'BNB20',
  trc20 = 'TRC20',
}

export const coinNames: Record<CoinType, string> = {
  [CoinType.ethereum]: 'Ethereum',
  [CoinType.binancecoin]: 'Binance Smart chain',
  [CoinType.bitcoin]: 'Bitcoin',
  [CoinType.bitcoincash]: 'Bitcoin Cash',
  [CoinType.dash]: 'Dash',
  [CoinType.doge]: 'Doge',
  [CoinType.litecoin]: 'Litecoin',
  [CoinType.ripple]: 'Ripple',
  [CoinType.tether]: 'Tether',
  [CoinType.tron]: 'Tron',
  [CoinType.zcash]: 'Z-Cash',
  [CoinType.erc20]: 'Ethereum (ETH)',
  [CoinType.bep20]: 'Binance Smart chain (BSC)',
  [CoinType.trc20]: 'Tron (TRX)',
};

export const coinIcons: Record<CoinType, string> = {
  [CoinType.ethereum]: 'ethereum',
  [CoinType.binancecoin]: 'binancecoin',
  [CoinType.bitcoin]: 'bitcoin',
  [CoinType.bitcoincash]: 'bitcoincash',
  [CoinType.dash]: 'dash',
  [CoinType.doge]: 'doge',
  [CoinType.litecoin]: 'litecoin',
  [CoinType.ripple]: 'ripple',
  [CoinType.tether]: 'tether',
  [CoinType.tron]: 'tron',
  [CoinType.zcash]: 'zcash',
  [CoinType.erc20]: 'ethereum',
  [CoinType.trc20]: 'tron',
  [CoinType.bep20]: 'binancecoin',
};

export const coinOrder: CoinType[] = [
  CoinType.bitcoin,
  CoinType.ethereum,
  CoinType.litecoin,
  CoinType.tether,
  CoinType.ripple,
  CoinType.tron,
  CoinType.doge,
  CoinType.binancecoin,
  CoinType.bitcoincash,
];

export const emptyBalances = coinOrder.reduce(
  (acc, coin) => ({ ...acc, [coin]: Math.random() }),
  {} as Record<CoinType, number>,
);
