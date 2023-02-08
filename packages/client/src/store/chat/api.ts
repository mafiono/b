import axios from 'axios';
import { api } from '../../utils/api';
import { ApiPaths } from '../../utils/api/constants';
import {
  ChatGuestTokenResponse,
  ChatMessageDownloadResponse,
  ChatMinRainAmountResponse,
  ChatPostMessageResponse,
  ChatRainRequest,
  ChatTippingRequest,
  ChatUsersOnlineResponse,
} from './types';

export const chatGetGuestToken = () =>
  api.get<ChatGuestTokenResponse>(ApiPaths.AuthGetGuestToken);

export const chatPostMessage = (text: string, file_data: string) =>
  api.post<ChatPostMessageResponse>(ApiPaths.ChatAddMessage, { text, file_data });

export const chatPostTip = (body: ChatTippingRequest) =>
  api.post<void>(ApiPaths.ChatTip, body);

export const chatPostRain = (body: ChatRainRequest) =>
  api.post<void>(ApiPaths.ChatRain, body);

export const chatGetParticipants = (limit: number, offset: number) =>
  api.get<ChatUsersOnlineResponse>(ApiPaths.ChatUsersOnline, {
    params: { limit, offset },
  });
 
export const chatGetRainMinAmount = () => {
  const cancelTokenSource = axios.CancelToken.source();

  return {
    request: api.get<ChatMinRainAmountResponse>(ApiPaths.RainMinAmount, {
      cancelToken: cancelTokenSource.token,
    }),
    cancel: cancelTokenSource.cancel,
  };
};

export const chatMessageDownload = (messageId: string) =>
  api.post<ChatMessageDownloadResponse>(ApiPaths.MessageDownload, {
    messageId,
  });
