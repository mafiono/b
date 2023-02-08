import { MiddlewareAPI } from 'redux';
import { State } from '@betnomi/client/src/types/store';
import Centrifuge, { Subscription } from 'centrifuge';
import { CentrifugeActionTypes } from '../../../types/store/centrifuge';
import {
  centrifugeActionWithSuffix,
  centrifugeConnected,
  centrifugeDisconnected,
  centrifugeHistory,
  centrifugeMessage,
} from '../../net/centrifuge';
import { onRefresh } from './onRefresh';
import { onTransportClose } from './onTransportClose';
import { CentrifugeMessage } from '../../../types/chat';

const centrifugeMiddleware = (
  serverUrl: string,
  channels: string[],
  suffix: string = '',
) => {
  let centrifuge: Centrifuge;
  let subscriptions: Record<string, Subscription> = {};

  return (store: MiddlewareAPI<any, State>) => (
    next: (action: any) => void,
  ) => (action: any) => {
    switch (action.type) {
      case centrifugeActionWithSuffix(CentrifugeActionTypes.Connect, suffix): {
        const { token }: { token: string } = action.payload;
        centrifuge = new Centrifuge(serverUrl, {
          onRefresh: onRefresh(store),
          onTransportClose: onTransportClose(store, suffix),
        });

        if (token) {
          centrifuge.setToken(token);
        }

        centrifuge.on('connect', (ctx) => {
          store.dispatch(centrifugeConnected(suffix, ctx));
        });

        centrifuge.on('disconnect', (ctx) => {
          store.dispatch(centrifugeDisconnected(suffix, ctx));
        });

        centrifuge.connect();

        break;
      }

      case centrifugeActionWithSuffix(
        CentrifugeActionTypes.Unsubscribe,
        suffix,
      ): {
        const { room } = action;

        if (!subscriptions[room]) {
          return next(action);
        }

        subscriptions[room].unsubscribe();

        break;
      }

      case centrifugeActionWithSuffix(
        CentrifugeActionTypes.Subscribe,
        suffix,
      ): {
        const { room } = action;

        if (subscriptions[room]) {
          return next(action);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        subscriptions[room] = centrifuge.subscribe(room, (message) => {
          store.dispatch(centrifugeMessage(suffix, message));
        });

        subscriptions[room].history({ limit: 100 }).then((result) => {
          const messages = result.publications.map((item) => item.data as CentrifugeMessage);
          store.dispatch(centrifugeHistory(suffix, messages));
        });

        break;
      }

      case centrifugeActionWithSuffix(
        CentrifugeActionTypes.Disconnect,
        suffix,
      ): {
        if (centrifuge) {
          centrifuge.disconnect();
          subscriptions = {};
        }

        break;
      }

      case centrifugeActionWithSuffix(CentrifugeActionTypes.SetToken, suffix): {
        if (action.token) {
          centrifuge.setToken(action.token);
        }
        break;
      }

      default:
        return next(action);
    }
  };
};

export { centrifugeMiddleware };
