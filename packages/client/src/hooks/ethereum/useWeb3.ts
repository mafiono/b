import { useCallback, useEffect, useState } from 'react';
import { checkAvailable } from '../../utils/ethereum/checkAvailable';
import { errorNeedInstall } from '../../constants/ethereum';

export const useWeb3 = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { ethereum } = (window as any);

  useEffect(() => {
    setIsAvailable(checkAvailable());
  }, []);

  const onConnect = useCallback(() => setIsConnected(true), []);
  const onDisconnect = useCallback(() => setIsConnected(false), []);

  useEffect(() => {
    if (!ethereum) {
      return;
    }

    ethereum.on('connect', onConnect);
    ethereum.on('disconnect', onDisconnect);

    return () => {
      ethereum.on('connect', onConnect);
      ethereum.on('disconnect', onDisconnect);
    };
  }, [ethereum, onConnect, onDisconnect]);

  const connect = useCallback(async () => {
    if (!isAvailable) {
      throw new Error(errorNeedInstall);
    }
    await ethereum.enable();
  }, [isAvailable, isConnected]);
  
  return { connect };
};
