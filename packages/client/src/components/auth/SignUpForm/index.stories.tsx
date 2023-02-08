import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { SignUpForm } from './index';

storiesOf('Auth', module).add('SignupForm', () => {
  const values = {
    username: text('username', ''),
    password: text('password', ''),
    email: text('email', ''), 
    referralCode: text('referralCode', ''),
    terms: boolean('terms', false),
  };
  const onSubmit = action('onSubmit');
  const onUserChange = action('onUserChange');
  const onPasswordChange = action('onPasswordChange');
  const onEmailChange = action('onEmailChange');
  const onTermsChange = action('onTermsChange');
  const onRefferalChange = action('onRefferalChange');
  const handleBlurUser = action('handleBlurUser');
  const handleBlurPassword = action('handleBlurPassword');
  const handleBlurEmail = action('handleBlurEmail');

  const touched = {
    username: boolean('usernameInputTouched', false),
    password: boolean('passwordInputTouched', false),
    email: boolean('emailInputTouched', false),
    terms: boolean('termsInputTouched', false),
  };
  const errors = {
    username: text('usernameInputError', ''),
    password: text('passwordInputError', ''),
    email: text('emailInputError', ''),
    terms: text('termsError', ''),
  };

  return (
    <div style={{ width: 368 }}>
      <SignUpForm
        values={values}
        onUserChange={onUserChange}
        onPasswordChange={onPasswordChange}
        onEmailChange={onEmailChange}
        onSubmit={onSubmit}
        onTermsChange={onTermsChange}
        errors={errors}
        touched={touched}
        handleBlurUser={handleBlurUser}
        handleBlurPassword={handleBlurPassword}
        handleBlurEmail={handleBlurEmail}
        onRefferalChange={onRefferalChange}
      />
    </div>
  );
});
