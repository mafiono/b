import { storiesOf } from '@storybook/react';
import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { keys } from 'ramda';
import { TextInput } from './index';
import { FontIcon, FontIconName } from '../FontIcon';
import Coin from '../Coin';
import { CoinType } from '../../types/ui';

const elements = {
  nothing: undefined,
  text: 'text',
  icon: <FontIcon name={FontIconName.User} size={16} />,
  coin: <Coin coin={CoinType.bitcoin} size={16} />,
};

storiesOf('Basic', module).add('TextInput', () => {
  const onChange = action('onChange');

  const value = text('Value', 'Some input value');
  const kind = select('Type', { text: 'text', password: 'password' }, 'text');
  const left = select('Left', keys(elements), keys(elements)[0]);
  const right = select('Right', keys(elements), keys(elements)[0]);

  return (
    <div style={{ width: 300 }}>
      <TextInput
        value={value}
        onChange={onChange}
        left={elements[left]}
        right={elements[right]}
        type={kind}
      />
    </div>
  );
});
