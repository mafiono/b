import { object, string } from 'yup';
import { useCallback, useEffect, useRef } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useDispatch } from 'react-redux';
import { Option } from '@betnomi/libs/components/Autocomplete';
import { Gender } from '../../constants/gender';
import { ProfileKYCBasicError } from '../../types/store/profile';
import { profileSubmitBasic } from '../../store/profile/actionCreators';
import { useTranslation } from '../../i18n';
import { useShallowSelector } from '../index';
import { selectProfileBasic } from '../../store/profile/selectors';
import { useCountriesAutocomplete } from '../autocomplete/useCountriesAutocomplete';

export interface ProfileKYCBasicFormikValues {
  name: string;
  surname: string;
  zipCode: string;
  date: string;
  street: string;
  gender?: Gender;
  city: string;
  area: string;
  country: string;
}

export const profileKYCBasicFormikValues: ProfileKYCBasicFormikValues = {
  name: '',
  surname: '',
  zipCode: '',
  date: '',
  street: '',
  country: '',
  area: '',
  city: '',
  gender: undefined,
};

const zipCodeReg = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');

const validationSchema = object().shape({
  name: string().required(),
  surname: string().required(),
  zipCode: string().matches(zipCodeReg).required(),
  date: string().required(),
  street: string().required(),
  country: string().required(),
  area: string().required(),
  city: string().required(),
});

export const useProfileBasicFormik = (
  values: ProfileKYCBasicFormikValues = profileKYCBasicFormikValues,
) => {
  const initValues = useRef(values);
  const { showErrorToast, showSuccessToast } = useToasts();
  const dispatch = useDispatch();
  const { t } = useTranslation('main');

  const onSubmit = useCallback(
    (
      vals: ProfileKYCBasicFormikValues,
      { setSubmitting }: FormikHelpers<ProfileKYCBasicFormikValues>,
    ) => {
      const callback = (e?: ProfileKYCBasicError) => {
        setSubmitting(false);
        if (e) {
          showErrorToast(e.message);
          return;
        }

        showSuccessToast(t('Successfull'));
      };

      dispatch(profileSubmitBasic(vals, callback));
    },
    [],
  );

  const basicValues = useShallowSelector(selectProfileBasic);

  const formik = useFormik<ProfileKYCBasicFormikValues>({
    initialValues: initValues.current,
    onSubmit,
    validationSchema,
  });

  const { variants, onSearch, selected: country } = useCountriesAutocomplete(
    formik.values.country,
  );

  const onChangeCountry = useCallback(
    (val: Option) => {
      formik.setFieldValue('country', val.value);
    },
    [formik.setFieldValue],
  );

  useEffect(() => {
    formik.setValues(basicValues);
  }, [basicValues]);

  return {
    formik,
    variants,
    onSearch,
    onChangeCountry,
    country,
    isLoading: formik.isSubmitting || !basicValues.isLoaded,
  };
};
