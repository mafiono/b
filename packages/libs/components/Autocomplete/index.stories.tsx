import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { Autocomplete, Option } from './index';
import { FontIcon, FontIconName } from '../FontIcon';
import { useFakeAutocompleteOptions } from '../../hooks/storybook/useFakeAutocompleteOptions';

const customRenderer = (current: Option) => (
  <div>
    <FontIcon name={FontIconName.User} />
    {current.label}
  </div>
);

storiesOf('Basic', module).add('Autocomplete', () => {
  const onSearch = action('onSearch');
  const onChange = action('onChange');
  const variants = useFakeAutocompleteOptions();
  const type = select(
    'Type',
    { simple: 'simple', complex: 'complex' },
    'simple',
  );

  return (
    <div style={{ width: 400 }}>
      {type === 'complex' ? (
        <Autocomplete
          onSearch={onSearch}
          onChange={onChange}
          variants={variants}
          left={<FontIcon name={FontIconName.Users} size={16} />}
          customRenderer={customRenderer}
          value={variants[0]}
        />
      ) : (
        <Autocomplete
          variants={variants}
          onSearch={onSearch}
          onChange={onChange}
          left={<FontIcon name={FontIconName.Users} size={16} />}
          value={variants[0]}
        />
      )}
    </div>
  );
});
