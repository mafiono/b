import React, {
  FC, useCallback, useEffect, useMemo, useState, 
} from 'react';
import { CentrifugeMessage } from '@betnomi/libs/types/chat';
import {
  AutoSizer, CellMeasurer, CellMeasurerCache, List, 
} from 'react-virtualized';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import { debounce } from 'throttle-debounce';
import { RenderedRows } from 'react-virtualized/dist/es/List';
import { createPortal } from 'react-dom';
import { ChatMessage } from '@betnomi/libs/components/chat/ChatMessage';
import { SentMessage } from '@betnomi/libs/components/chat/SentMessage';
import styles from './styles.module.scss';
import { useUser } from '../../../hooks/useUser';
import { ChatMessageContent } from '../ChatMessageContent';
import { ChatNewMessagesCount } from '../ChatNewMessagesCount';

interface IProps {
  messages: CentrifugeMessage[];
  active: boolean;
}

const ROW_SIZE = 85;
const SCROLL_ON_MESSAGES = 3; 

const ChatHistory: FC<IProps> = ({ messages, active }) => {
  const [ref, setRef] = useState<List | null>(null);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [lastSeenMessage, setLastSeenMessage] = useState(0);
  const newMessagesCount = messages.length - lastSeenMessage - 1;
  const { name } = useUser();

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: ROW_SIZE,
      }),
    [],
  );

  const rowRenderer = useCallback(
    ({
      index, parent, key, style, 
    }) => (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ registerChild, measure }) => (
          <div
            ref={(el) => registerChild!(el as Element)}
            style={style}
            className={styles.row}
          >
            {messages[index].sender_nickname !== name ? (
              <ChatMessage
                image="" 
                progress={100}
                level={PlayerLevel.Hero} 
                username={messages[index].sender_nickname}
                timestamp={messages[index].created_at}
              >
                <ChatMessageContent message={messages[index]} onUpdate={measure} />
              </ChatMessage>
            ) : (
              <SentMessage timestamp={messages[index].created_at}>
                <ChatMessageContent message={messages[index]} onUpdate={measure} />
              </SentMessage>
            )}
          </div>
        )}
      </CellMeasurer>
    ),
    [messages, cache, name],
  );

  const onRowsRendered = useCallback(
    debounce<(info: RenderedRows) => void>(100, false, ({ stopIndex }) =>
      setCurrentMessage(stopIndex)),
    [setCurrentMessage],
  );

  const scrollToBottom = useCallback(() => {
    if (!ref) {
      return;
    }

    ref.scrollToRow(messages.length);
  }, [ref, messages.length]);

  // auto-scrolls to bottom
  useEffect(() => {
    if (currentMessage + SCROLL_ON_MESSAGES < lastSeenMessage) {
      return;
    }

    scrollToBottom();
  }, [messages.length, ref, active]);

  // sets last seen message
  useEffect(() => {
    if (currentMessage > lastSeenMessage) {
      setLastSeenMessage(currentMessage);
    }
  }, [currentMessage, lastSeenMessage]);

  return (
    <>
      {createPortal(
        <span className={styles.hud}>
          <div>
            Message at the bottom:
            {currentMessage}
          </div>

          <div>
            Last seen message:
            {lastSeenMessage}
          </div>
          <div>
            New messages:
            {newMessagesCount}
          </div>
        </span>,
        document.body,
      )}

      <AutoSizer>
        {({ width, height }) => (
          <List
            scrollToAlignment="end"
            estimatedRowSize={85}
            ref={setRef}
            height={height}
            rowHeight={cache.rowHeight}
            rowCount={messages.length}
            width={width}
            rowRenderer={rowRenderer}
            className={styles.list}
            overscanRowCount={0}
            onRowsRendered={onRowsRendered}
          />
        )}
      </AutoSizer>

      <ChatNewMessagesCount count={newMessagesCount} onClick={scrollToBottom} />
    </>
  );
};
export { ChatHistory };
