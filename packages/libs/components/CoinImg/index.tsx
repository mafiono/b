import React, { FC } from 'react';
import { coinIcons, CoinType } from '@betnomi/libs/types';
import { coins } from '@betnomi/libs/assets/img/coins';

interface ImgProps {
  imgData: string;
}

const CoinImg: FC<ImgProps> = ({ imgData }) => {
  const checkType = (name: string) => {
    if (name === 'BTC') {
      return CoinType.bitcoin;
    }
    if (name === 'ETH') {
      return CoinType.ethereum;
    }
    if (name === 'BCH') {
      return CoinType.bitcoincash;
    }
    if (name === 'LTC') {
      return CoinType.litecoin;
    }
    if (name === 'BNB') {
      return CoinType.binancecoin;
    }
    if (name === 'XRP') {
      return CoinType.ripple;
    }
    if (name === 'DOGE') {
      return CoinType.doge;
    }
    if (name === 'TRX') {
      return CoinType.tron;
    }
    if (name === 'USDT') {
      return CoinType.tether;
    }
    if (name === 'DASH') {
      return CoinType.dash;
    }
    if (name === 'ZEC') {
      return CoinType.zcash;
    }
    return CoinType.bitcoin;
  };

  const name = coinIcons[checkType(imgData)];
  const src = coins[checkType(imgData)];

  return <img src={src} alt={name} width={16} height={16} />;
};

export { CoinImg };
