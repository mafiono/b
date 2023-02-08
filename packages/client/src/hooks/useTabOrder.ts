import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { history } from '@betnomi/libs/utils';
import { Routes } from '../constants/routes';

export const useTabOrder = (
  tabs: string[],
  activeTab: string,
  root: string = Routes.Homepage,
) => {
  const dispatch = useDispatch();
  const active = useMemo(() => tabs.indexOf(activeTab), [tabs, activeTab]);
  const onTabChange = useCallback(
    (val: number, replace = false) => {
      if (replace) {
        history.replace(`${root}/${tabs[val]}`);
        return;
      }

      history.push(`${root}/${tabs[val]}`);
    },
    [dispatch, root],
  );

  return { active: active >= 0 ? active : 0, onTabChange };
};
