import React, { FC, useMemo } from 'react';
import format from 'date-fns/format';
import styles from './styles.module.scss';
import { UserImage, UserImageProps } from '../../UserImage';
import { LevelBadge } from '../../LevelBadge';

export type ChatMessageProps = Omit<UserImageProps, 'size'> & {
  username: string;
  timestamp: number;
};

const ChatMessage: FC<ChatMessageProps> = ({
  image,
  progress,
  level,
  children,
  username,
  timestamp,
}) => {
  const date = useMemo(() => format(timestamp, 'HH:mm'), [timestamp]);

  return (
    <div className={styles.message}>
      <div className={styles.avatar}>
        <UserImage image={image} progress={progress} level={level} />
        <LevelBadge level={level} />
      </div>

      <div className={styles.content}>
        <div className={styles.username}>
          <div className={styles.username_text}>{username}</div>
          <div className={styles.username_time}>{date}</div>
        </div>

        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
};

export { ChatMessage };
