import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { values } from 'ramda';
import { action } from '@storybook/addon-actions';
import { CoinSelect } from './index';
import { CoinType } from '../../types/ui';
import { useFakeCoinNames } from '../../hooks/storybook/useFakeCoinNames';

storiesOf('Basic', module).add('CoinSelect', () => {
  const names = useFakeCoinNames();
  const selected = select('Selected', names, values(names)[0]) as CoinType;
  const disabled = boolean('Disabled', false);
  const onSelect = action('onSelect');
  const withName = boolean('WithName', false);
  const withLine = boolean('WithLine', false);

  return (
    <div style={{ width: 256 }}>
      <CoinSelect 
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        withName={withName}
        withLine={withLine}
      />
    </div>
  );
});
