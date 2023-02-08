import React, { FC, useCallback, useMemo } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Dropdown } from '@betnomi/libs/components/Dropdown';
import { values } from 'ramda';
import { ChatRoom, chatRoomNames } from '../../../store/chat/constants';
import styles from './styles.module.scss';

interface IProps {
  current: ChatRoom;
  onChange: (room: ChatRoom) => void;
  active: boolean;
}

const ChatRoomSelect: FC<IProps> = ({ current, onChange, active }) => {
  const onSelect = useCallback(
    (room: ChatRoom) => {
      if (room === current) {
        return;
      }

      onChange(room);
    },
    [current, onChange],
  );

  const deps = useMemo(() => [active], [active]);

  return (
    <div className={styles.wrap}>
      <Dropdown
        placement="bottom-start"
        deps={deps}
        delay={300}
        label={(
          <div className={styles.select}>
            <FontIcon
              name={FontIconName.World}
              size={16}
              className={styles.world}
            />

            {ChatRoom.English}

            <FontIcon
              name={FontIconName.ChevronDown}
              size={12}
              className={styles.chevron}
            />
          </div>
        )}
      >
        <ul className={styles.options}>
          {values(ChatRoom).map((room) => (
            <li key={room}>
              <button onMouseDown={() => onSelect(room)}>
                {chatRoomNames[room]}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export { ChatRoomSelect };
