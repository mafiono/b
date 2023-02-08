import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Coin from '.';
import { CoinType } from '../../types/ui';

storiesOf('Basic', module).add('Coin', () => {
  const type = select<CoinType>('coin', {
    ethereum: CoinType.ethereum,
    binancecoin: CoinType.binancecoin,
    bitcoincash: CoinType.bitcoincash,
    bitcoin: CoinType.bitcoin,
    dash: CoinType.dash,
    doge: CoinType.doge,
    litecoin: CoinType.litecoin,
    ripple: CoinType.ripple,
    tether: CoinType.tether,
    tron: CoinType.tron,
    zcash: CoinType.zcash,
  }, CoinType.ethereum);
 
  return (
    <Coin
      coin={type}
    />
  );
});
