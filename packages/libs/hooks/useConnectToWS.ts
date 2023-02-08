import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connectToCentrifuge, disconnectCentrifuge } from '../store/net/centrifuge';

const useConnectWS = (suffix: string = '') => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectToCentrifuge(suffix));

    return () => {
      dispatch(disconnectCentrifuge(suffix));
    };
  }, []);
};

export default useConnectWS;
