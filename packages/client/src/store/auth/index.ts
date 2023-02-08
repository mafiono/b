import createReducer from '@betnomi/libs/utils/createReducer';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import { CoinType } from '@betnomi/libs/types';
import { AuthState } from '../../types/store/auth';
import { authHandlers } from './handlers';

export const authInitialState: Readonly<AuthState> = {
  access: '',
  refresh: '',
  game: '',
  currency: CoinType.bitcoin,
  ui: {
    isChatActive: false,
    isMenuActive: false,
  },
  login: {
    error: '',
    isLoading: false,
  },
  signUp: {
    error: '',
    isLoading: false,
  },
  user: {
    name: '',
    level: PlayerLevel.User,
    progress: 75,
    confirmed: false,
    image: '',
    balances: {},
    id: 0,
  },
  ranks: {
    list: undefined,
    my: {
      userId: 0,
      rankId: 0,
      rankGivenAt: 0,
      affiliatePlanId: 0,
      affiliatePlanAssignedAt: 0,
      affiliatePlanAssignedBy: 0,
      referrerId: 0,
      totalBet: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  },
  oauth: {
    provider: undefined,
    token: '',
  },
  telegram: {
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    photo_url: '',
    auth_date: '',
    hash: '',
  },
  viewInUSD: true,
};

export default createReducer(authInitialState, authHandlers);
