import React, { FC, useEffect } from 'react';
import { CentrifugeMessage } from '@betnomi/libs/types/chat';
import { ChatImageMessage } from '../ChatImageMessage';
import { ChatTextMessage } from '../ChatTextMessage';

interface Props {
  message: CentrifugeMessage;
  onUpdate: () => void
}

const ChatMessageContent: FC<Props> = ({ message, onUpdate }) => {
  useEffect(() => onUpdate(), []);

  if (message.file_name) {
    return <ChatImageMessage messageId={message.id} onLoad={onUpdate} />;
  }

  return (
    <ChatTextMessage>{message.text}</ChatTextMessage>
  );
};

export { ChatMessageContent };
