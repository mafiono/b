import React, { FC } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { ChatRoomSelect } from '../ChatRoomSelect';
import { ChatRoom } from '../../../store/chat/constants';

interface IProps {
  onClose: () => void;
  participants: number;
  online: boolean;
  room: ChatRoom,
  setRoom: (room: ChatRoom) => void;
  active: boolean;
}

const ChatHead: FC<IProps> = ({
  onClose,
  participants,
  online,
  room,
  setRoom,
  active,
}) => (
  <div className={styles.head}>
    <div className={styles.select}>
      <ChatRoomSelect current={room} onChange={setRoom} active={active} />
    </div>

    <div className={styles.participants}>
      <span className={classNames(styles.online, { [styles.active]: online })} />
      <span>{participants}</span>
      <FontIcon name={FontIconName.Users} size={16} />
    </div>

    <button className={styles.close} onClick={onClose} type="button">
      <FontIcon name={FontIconName.Close} size={16} />
    </button>
  </div>
);

export { ChatHead };
