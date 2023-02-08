import React, {
  FC, useCallback, useEffect, useRef, 
} from 'react';
import { FormikHelpers } from 'formik';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import styles from './styles.module.scss';
import { useChat } from '../../../hooks/useChat';
import { ChatFormikValues, useChatFormik } from '../../../hooks/formik/useChatFormik';
import { ChatInput } from '../../../components/chat/ChatInput';
import { ChatHistory } from '../../../components/chat/ChatHistory';
import { ChatHead } from '../../../components/chat/ChatHead';
import { useTranslation } from '../../../i18n';
import { useBase64Uploader } from '../../../hooks/upload/useBase64Uploader';

interface IProps {
  onChatToggle: (val: boolean) => void;
  active: boolean;
}

const noop = () => {};
const allowedTypes = ['image/jpeg', 'image/webp', 'image/png'];

const Chat: FC<IProps> = ({ active, onChatToggle }) => {
  const onClose = useCallback(() => onChatToggle(!active), [
    active,
    onChatToggle,
  ]);
  const input = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('main');
  const { showErrorToast, hideToast } = useToasts();

  const {
    sendMessage,
    canWrite,
    messages,
    isConnected,
    participants,
    room,
    setRoom,
    showRainModal,
    showTippingModal,
  } = useChat();

  const onSend = useCallback(
    ( 
      values: ChatFormikValues,
      { resetForm }: FormikHelpers<ChatFormikValues>,
    ) => {
      hideToast();

      const cb = (e?: string) => {
        if (input.current) {
          setTimeout(() => input.current!.focus(), 0);
        }

        if (e) {
          showErrorToast(t(e), t('Error'));
          return;
        }

        resetForm();
      };

      sendMessage(values.text, '', cb);
    },
    [sendMessage, input, hideToast, showErrorToast],
  );

  const {
    handleSubmit, values, handleChange, setValues,
  } = useChatFormik(
    { text: '' }, 
    onSend,
  );

  const onAttach = useCallback((files: string[]) => {
    if (!files?.length || !files[0]) {
      return;
    }

    const cb = (e?: string) => {
      if (input.current) {
        setTimeout(() => input.current!.focus(), 0);
      }

      if (e) {
        showErrorToast(t(e), t('Error'));
      }
    };

    sendMessage('', files[0], cb);
  }, [sendMessage, setValues]);

  const onUpload = useBase64Uploader(onAttach, allowedTypes);

  // subscribe to room on change, reconnect and chat initial open
  useEffect(() => {
    if (!active || !input.current || !isConnected) {
      return;
    }

    setRoom(room);
  }, [active, room, setRoom, isConnected]); 

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <ChatHead
          online={isConnected}
          participants={participants}
          onClose={onClose}
          room={room}
          setRoom={setRoom}
          active={active}
        />
      </div>

      <div className={styles.chat}>
        <div className={styles.history}>
          {active && <ChatHistory messages={messages} active={active} />}
        </div>
      </div>

      <div className={styles.input}>
        <ChatInput
          text={values.text} 
          onSubmit={handleSubmit}
          onTextChange={handleChange('text')}
          onTipClick={showTippingModal}
          onRainClick={showRainModal}
          onGIFClick={noop}
          onAttachmentsClick={onUpload}
          onEmojiClick={noop}
          disabled={!canWrite}
          inputRef={input}
        />
      </div>
    </div>
  );
};

export { Chat };
