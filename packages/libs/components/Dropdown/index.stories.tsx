import { storiesOf } from '@storybook/react';
import React from 'react';
import { Dropdown } from './index';

storiesOf('Basic', module).add('Dropdown', () => (
  <Dropdown
    label={<div>Dropdown</div>}
  >
    <ul>
      <li>First</li>
      <li>Second</li>
      <li>Third</li>
    </ul>
  </Dropdown>
));
