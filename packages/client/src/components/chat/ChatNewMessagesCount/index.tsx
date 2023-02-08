import React, {
  FC, useCallback, useEffect, useState, 
} from 'react';
import { debounce } from 'throttle-debounce';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

interface Props {
  count: number;
  onClick: () => void;
}

const ChatNewMessagesCount: FC<Props> = ({ onClick, count }) => {
  const [isShown, setIsShown] = useState(false);
  const { t } = useTranslation('chat');

  const setIsShownDebounced = useCallback(debounce(300, setIsShown), [setIsShown]);

  useEffect(() => {
    if (count > 0) {
      setIsShownDebounced(true);  
    } else {
      setIsShownDebounced(false); 
      setIsShown(false);
    }
  }, [count]);

  if (!isShown) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.new_messages}
      onClick={onClick}
    >
      {t('{{count}} new messages', { count })}
    </button>
  );
};

export { ChatNewMessagesCount };
