import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { HeaderGuest } from './index';

storiesOf('Layout', module).add('HeaderGuest', () => {
  const onChatToggle = action('onChatToggle');
  const active = boolean('ChatActive', false);
  const onOpenSignInModal = action('onOpenSignInModal');
  const onOpenSignUpModal = action('onOpenSignUpModal');

  return (
    <HeaderGuest
      onChatToggle={onChatToggle}
      active={active}
      onOpenSignInModal={onOpenSignInModal}
      onOpenSignUpModal={onOpenSignUpModal}
    />
  );
});
