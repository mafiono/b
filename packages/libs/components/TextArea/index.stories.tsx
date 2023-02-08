import { storiesOf } from '@storybook/react';
import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TextArea } from './index';

storiesOf('Basic', module).add('TextArea', () => {
  const autoSize = boolean('autosize', true);
  const value = text('Value', 'Sample textarea');
  const onChange = action('onChange');

  return (
    <TextArea autoSize={autoSize} onChange={onChange}>{value}</TextArea>
  );
});
