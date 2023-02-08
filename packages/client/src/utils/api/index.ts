import { configureApi } from '@betnomi/libs/utils/api';

export const api = configureApi(process.env.REACT_APP_API_URL);
