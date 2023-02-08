import ethereum from './ethereum.svg';
import binancecoin from './binancecoin.svg';
import bitcoin from './bitcoin.svg';
import bitcoincash from './bitcoincash.svg';
import dash from './dash.svg';
import doge from './doge.svg';
import litecoin from './litecoin.svg';
import ripple from './ripple.svg';
import tether from './tether.svg';
import tron from './tron.svg';
import zcash from './zcash.svg';
import { CoinType } from '../../../types';

export const coins: Record<CoinType, string> = {
  [CoinType.ethereum]: ethereum,
  [CoinType.erc20]: ethereum,
  [CoinType.binancecoin]: binancecoin,
  [CoinType.bep20]: binancecoin,
  [CoinType.bitcoin]: bitcoin,
  [CoinType.bitcoincash]: bitcoincash,
  [CoinType.dash]: dash,
  [CoinType.doge]: doge,
  [CoinType.litecoin]: litecoin,
  [CoinType.ripple]: ripple,
  [CoinType.tether]: tether,
  [CoinType.tron]: tron,
  [CoinType.trc20]: tron,
  [CoinType.zcash]: zcash,
};
