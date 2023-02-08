import web3 from './web3instance';
import { errorNeedInstall } from '../../constants/ethereum';
import { checkAvailable } from './checkAvailable';

export const signMessage = async (message: string) => {
  const isAvailable = checkAvailable();
  
  if (!isAvailable) {
    throw new Error(errorNeedInstall);
  } 

  const account = web3.eth.accounts.create();
  return web3.eth.accounts.sign(
    message,
    account.privateKey,
  );
};
