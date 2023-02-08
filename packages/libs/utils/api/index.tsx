import axios from 'axios';

export const configureApi = (baseURL?: string) => axios.create({ baseURL });
