import web3 from './web3instance';
import { errorNeedInstall } from '../../constants/ethereum';
import { checkAvailable } from './checkAvailable';

export const getAddress = async (): Promise<string> => {
  const isAvailable = checkAvailable();
  
  if (!isAvailable) {
    throw new Error(errorNeedInstall);
  }

  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};
