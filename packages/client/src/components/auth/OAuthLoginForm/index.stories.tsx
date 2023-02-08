import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { OAuthLoginForm } from './index';

storiesOf('Home', module).add('Footer', () => {
  const login = text('Login', 'login');
  const errors = {
    login: text('Login error', ''),
  };
  const touched = { login: true };
  const isLoading = boolean('isLoading', false);
  const terms = boolean('Terms', false);
  const onSubmit = action('onSubmit');
  const onLoginChange = action('onLoginChange');
  const onBlurLogin = action('onBlurLogin');
  const onTermsChange = action('onTermsChange');

  return (
    <OAuthLoginForm
      login={login}
      errors={errors}
      touched={touched}
      onSubmit={onSubmit}
      isLoading={isLoading}
      onLoginChange={onLoginChange}
      onBlurLogin={onBlurLogin}
      terms={terms}
      onTermsChange={onTermsChange}
    />
  );
});
