import { refreshTokens } from '@betnomi/client/src/store/refresh';
import { authLogout } from '@betnomi/client/src/store/auth/actionCreators';
import { MiddlewareAPI } from 'redux';
import { State } from '@betnomi/client/src/types/store';
import { connectToCentrifuge } from '../../net/centrifuge';

export const onTransportClose = (
  store: MiddlewareAPI<any, State>,
  suffix: string,
) => (ctx: object) => {
  // @ts-ignore
  if (ctx?.reason !== 'invalid token') {
    return;
  }

  (async () => {
    try {
      await refreshTokens(store);
      store.dispatch(connectToCentrifuge(suffix, store.getState().auth.access));
    } catch (e) {
      store.dispatch(authLogout({ reason: e.message }));
    }
  })();
};
