import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useShallowSelector } from './index';
import { selectAuthUI } from '../store/auth/selectors';
import { authSetUI } from '../store/auth/actionCreators';

export const useUserUI = () => {
  const dispatch = useDispatch();

  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const smallScreen = window.matchMedia('(min-width:768px) and (max-width: 1440px)').matches;

  const setIsChatActive = useCallback(
    (val: boolean) => {

      if(smallScreen){
        dispatch(authSetUI({ isChatActive: val }))
        dispatch(authSetUI({ isMenuActive: false }))
      }else{
        dispatch(authSetUI({ isChatActive: val }))
      }

    },
    [dispatch],
  );

  const setIsMenuActive = useCallback(
    (val: boolean) => {

      if(smallScreen){
        dispatch(authSetUI({ isMenuActive: val }))
        dispatch(authSetUI({ isChatActive: false }))
      }else{
        dispatch(authSetUI({ isMenuActive: val }))
      }

    },
    [dispatch],
  );

  return {
    isChatActive, isMenuActive, setIsChatActive, setIsMenuActive,
  };
};
