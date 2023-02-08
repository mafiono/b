import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import { object, string, boolean } from 'yup';

type Config = FormikConfig<OAuthLoginFormikValues>;

export interface OAuthLoginFormikValues {
  login: string;
  terms: boolean;
}

export const oauthLoginInitialValues: OAuthLoginFormikValues = {
  login: '',
  terms: false,
};

const validationSchema = object().shape({
  login: string().required(),
  terms: boolean().required().oneOf([true]),
});

export const useOauthLoginFormik = (
  values: OAuthLoginFormikValues = oauthLoginInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<OAuthLoginFormikValues>({
    initialValues: initialValues.current,
    validationSchema,
    onSubmit,
  });
};
