import { connectRouter } from 'connected-react-router';
import { history } from '@betnomi/libs/utils';
import auth from './auth';
import chat from './chat';
import modal from './modal';
import home from './home';
import rates from './rates';
import profile from './profile';

export default {
  router: connectRouter(history),
  auth,
  chat,
  modal,
  home,
  rates,
  profile,
};
