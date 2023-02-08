import React, {
  ChangeEventHandler, FC, FormEventHandler, useCallback, 
} from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

interface IProps {
  text: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onTextChange: (val: string) => void;
  onTipClick: () => void;
  onRainClick: () => void;
  onGIFClick: () => void;
  onAttachmentsClick: ChangeEventHandler<HTMLInputElement>;
  onEmojiClick: () => void;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const ChatInput: FC<IProps> = ({
  text,
  onSubmit,
  onTextChange,
  onAttachmentsClick,
  onGIFClick,
  onRainClick,
  onTipClick,
  onEmojiClick,
  disabled,
  inputRef,
}) => {
  const { t } = useTranslation('chat');
  const onChange = useCallback((event) => onTextChange(event.target.value), [
    onTextChange,
  ]);

  return (
    <form
      className={classNames(styles.wrapper, { [styles.disabled]: disabled })}
      onSubmit={onSubmit}
    >
      <div className={styles.input}>
        <input
          type={text}
          value={text}
          onChange={onChange}
          size={0}
          disabled={disabled}
          ref={inputRef}
        />

        <button
          className={styles.input_icon}
          onClick={onEmojiClick}
          type="button"
          disabled={disabled}
        >
          <FontIcon name={FontIconName.Smile} size={16} />
        </button>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={onTipClick}
          type="button"
          disabled={disabled}
        >
          <span className={styles.button_icon}>
            <FontIcon name={FontIconName.Bitcoin} size={16} />
          </span>

          <span>{t('Send a tip')}</span>
        </button>

        <div className={styles.separator} />

        <button
          className={styles.button}
          onClick={onRainClick}
          type="button"
          disabled={disabled}
        >
          <FontIcon name={FontIconName.Water} size={16} />
        </button>

        <div className={styles.spacer} />

        <button
          className={styles.button}
          onClick={onGIFClick}
          type="button"
          disabled={disabled}
        >
          <FontIcon name={FontIconName.GIF} size={16} />
        </button>

        <button
          className={classNames(styles.button, styles.attach)}
          type="button"
        >
          <input type="file" onChange={onAttachmentsClick} disabled={disabled} />
          <FontIcon name={FontIconName.Attachments} size={16} />
        </button>
      </div>
    </form>
  );
};

export { ChatInput };
