export interface ChatGuestTokenResponse {
  token: string;
}

export interface ChatPostMessageResponse {
  id: string;
  file_name: string;
  file_bucket: string;
}

export interface ChatTippingRequest {
  to_user_id: number
  to_user_email: string
  currency: string
  amount: number
}

export interface ChatRainRequest {
  to_users_count: number
  currency: string
  amount: string
  message: string
}

export interface ChatUsersOnlineResponse {
  total: string,
  list: {
    id: string,
    name: string
  }[],
}

export interface ChatMinRainAmountResponse {
  usd: number;
}

export interface ChatMessageDownloadResponse {
  name: string,
  encodedData: string,
}
