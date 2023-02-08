import React from 'react';
import { storiesOf } from '@storybook/react';
import { LoginBanner } from './index';

storiesOf('Basic', module).add('Banner', () => (
  <LoginBanner />
));
