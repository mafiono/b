import { put } from 'redux-saga/effects';
import { modalHide } from 'store/modal/actionCreators';
import { authSetLogin, authRestorePassword } from '../actionCreators';
import { signInErrorResponseToError } from '../../../utils/api/transforms';

export function* authRestorePasswordSaga({
  payload: { callback },
}: ReturnType<typeof authRestorePassword>) {
  try {
    yield put(authSetLogin({ isLoading: true }));
    yield put(modalHide());
    callback();
  } catch (error) {
    yield put(authSetLogin({ error: error.message }));
    callback(signInErrorResponseToError(error.response.data));
  } finally {
    yield put(authSetLogin({ isLoading: false }));
  }
}
