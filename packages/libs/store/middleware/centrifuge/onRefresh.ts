import { refreshTokens } from '@betnomi/client/src/store/refresh';
import { MiddlewareAPI } from 'redux';
import { State } from '@betnomi/client/src/types/store';
import { RefreshResponse } from 'centrifuge';
import { authLogout } from '@betnomi/client/src/store/auth/actionCreators';

export const onRefresh = (store: MiddlewareAPI<any, State>) => (
  ctx: object,
  cb: (val: RefreshResponse) => void,
) => {
  (async () => {
    try {
      await refreshTokens(store);
      cb({
        status: 200,
        data: { token: store.getState().auth.access },
      });
    } catch (e) {
      store.dispatch(
        authLogout({ reason: `centrifuge refresh error ${e.message}` }),
      );
    }
  })();
};
