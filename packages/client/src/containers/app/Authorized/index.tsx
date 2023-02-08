import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';

const Authorized: FC<{ redirect: string }> = ({ redirect, children }) => {
  const { isAuthorized } = useUser();

  if (!isAuthorized && redirect) {
    return <Redirect to={redirect} />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export { Authorized };
