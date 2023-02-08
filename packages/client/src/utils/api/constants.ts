export enum ApiPaths {
  AuthLogin = '/api/v1/auth/sign_in',
  AuthSignUp = '/api/v1/auth/sign_up',
  AuthRefresh = '/api/v1/auth/refresh',
  AuthGetGuestToken = '/api/v1/auth/guest',
  AuthGetMe = '/api/v1/notifier/users/me',
  AuthGetRanks = '/api/v1/affiliate/ranks',
  AuthGetMyAffiliates = '/api/v1/affiliate/users_me',
  ChatAddMessage = '/api/v1/chat/messages',
  ChatTip = '/api/v1/payments/tipping',
  ChatRain = '/api/v1/chat/money_rain',
  ChatUsersOnline = '/api/v1/chat/users_online',
  UserFind = '/api/v1/notifier/users/find',
  AffiliateGetAccounts = '/api/v1/affiliate/users/accounts',
  AuthLoginMetamask = '/api/v1/notifier/metamask_sign_in',
  AuthMetamaskPreSigned = '/api/v1/notifier/metamask_pre_signed',
  AuthSignUpMetamask = '/api/v1/notifier/metamask_sign_up',
  OAuth2Google = '/api/v1/notifier/oauth2/google/authorization',
  OAuth2Facebook = '/api/v1/notifier/oauth2/facebook/authorization',
  OAuthSignup = '/api/v1/notifier/oauth2_signup',
  CheckLoginExists = '/api/v1/notifier/check_login_exists',
  RainMinAmount = '/api/v1/chat/money_rain/minimum_amount',
  GetRates = '/api/v1/rates/rate',
  AuthLoginTelegram = '/api/v1/notifier/telegram_sign_in',
  AuthSignUpTelegram = '/api/v1/notifier/telegram_sign_up',
  MessageDownload = '/api/v1/chat/messages/download',
  ProfileDeposit = '/api/v1/payments/deposit',
  KYCCreate = '/api/v1/notifier/kyc/create',
  KYCUpdate = '/api/v1/notifier/kyc/update',
  KYC = '/api/v1/notifier/kyc/',
  SportsBet = '/api/v1/affiliate/sports_bets',
  Withdraw = '/api/v1/payments/withdraw',
  TransactionAll = '/api/v1/transactions/my',
  KYCProofOfAddress = '/api/v1/notifier/kyc/address_file',
  KYCSourceOfFunds = '/api/v1/notifier/kyc/funds_file',
  KYCIdentityBack = '/api/v1/notifier/kyc/identity_back_file',
  KYCIdentityFront = '/api/v1/notifier/kyc/identity_front_file',
}

export const backendBalancePrecision = 1e20;
