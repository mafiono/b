import React, { FC } from 'react';

type Props = {};

const ChatTextMessage: FC<Props> = ({
  children,
}) => (
  <div>
    {children}
  </div>
);

export { ChatTextMessage };
