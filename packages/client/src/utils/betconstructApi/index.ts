import { configureApi } from '@betnomi/libs/utils/api';

export const betconstructApi = configureApi(process.env.REACT_APP_BETCONSTRUCT_API_URL);
