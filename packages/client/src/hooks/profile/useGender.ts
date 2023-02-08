import { useMemo } from 'react';
import { keys } from 'ramda';
import { useTranslation } from '../../i18n';
import { Gender, genderTitle } from '../../constants/gender';
import { GenderItem } from '../../components/profile/ProfileKYCBasicForm';

export const useGender = () => {
  const { t } = useTranslation('profile');
  const genderItems = useMemo(() => keys(Gender).map<GenderItem>((gender) => ({
    type: Gender[gender],
    title: t(genderTitle[gender]),
  })), [t]);
  
  return { genderItems };
};
