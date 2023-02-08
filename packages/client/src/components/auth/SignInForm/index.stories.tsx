import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { SignInForm } from './index';

storiesOf('Auth', module).add('SigninForm', () => {
  const values = {
    username: text('username', ''),
    password: text('password', ''),
  };
  const onSubmit = action('onSubmit');
  const onUserChange = action('onUserChange');
  const onPasswordChange = action('onPasswordChange');
  const onRestoreOpen = action('onRestoreOpen');
  const handleBlurUser = action('handleBlurUser');
  const handleBlurPassword = action('handleBlurPassword');
  const touched = {
    username: boolean('usernameInputTouched', false),
    password: boolean('passwordInputTouched', false),
  };
  const errors = {
    username: text('usernameInputError', ''),
    password: text('passwordInputError', ''),
  };
  const loading = boolean('loading', false);

  return (
    <div style={{ width: 368 }}>
      <SignInForm
        values={values}
        onUserChange={onUserChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
        onRestoreOpen={onRestoreOpen}
        handleBlurUser={handleBlurUser}
        handleBlurPassword={handleBlurPassword}
        errors={errors}
        touched={touched}
        loading={loading}
      />
    </div>
  );
});
