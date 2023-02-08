import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { RestorePasswordForm } from './index';

storiesOf('Auth', module).add('RestorePasswordForm', () => {
  const values = {
    username: text('username', ''),
  };
  const onSubmit = action('onSubmit');
  const onUserChange = action('onUserChange');
  const handleBlurUser = action('handleBlurPassword');
  const touched = {
    username: boolean('usernameInputTouched', false),
  };
  const errors = {
    username: text('usernameInputError', ''),
  };
  const loading = boolean('loading', false);

  return (
    <div style={{ width: 368 }}>
      <RestorePasswordForm
        values={values}
        onUserChange={onUserChange}
        handleBlurUser={handleBlurUser}
        onSubmit={onSubmit}
        errors={errors}
        touched={touched}
        loading={loading}
      />
    </div>
  );
});
