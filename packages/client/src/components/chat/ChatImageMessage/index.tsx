import React, { FC } from 'react';
import { useMessageDownload } from '../../../hooks/chat/useMessageDownload';
import Skeleton from '../../../../../libs/components/Skeleton';
import styles from './styles.module.scss';

type Props = {
  messageId: string;
  onLoad: () => void;
};

const ChatImageMessage: FC<Props> = ({ messageId, onLoad }) => {
  const { src, isLoading } = useMessageDownload(messageId);

  return (
    <div className={styles.image}>
      {
        isLoading ? <Skeleton /> : <img src={src} alt="" onLoad={onLoad} />
      }
    </div>
  );
};

export { ChatImageMessage };
