import React from 'react';
import { coinIcons, CoinType } from '../../types/ui';
import { coins } from '../../assets/img/coins';

type Props = {
  coin: CoinType;
  className?: string;
  size?: number;
};

const Coin: React.FC<Props> = ({ coin, className, size = 44 }) => {
  const name = coinIcons[coin];
  const src = coins[coin];

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default Coin;
