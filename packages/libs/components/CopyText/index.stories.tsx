import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { CopyText } from './index';

storiesOf('Basic', module).add('CopyText', () => {
  const copytext = text('text', '0xdee88b38ab2552f300495vf0d0d0d0f1894jd900');
  const disabled = boolean('disabled', false);
  return (
    <div style={{ width: 450 }}>
      <CopyText
        text={copytext}
        disabled={disabled}
      />
    </div>
  );
});
