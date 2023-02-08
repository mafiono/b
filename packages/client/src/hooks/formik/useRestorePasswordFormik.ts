import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

type Config = FormikConfig<RestorePasswordValues>;

export interface RestorePasswordValues {
  username: string;
}

export const signInInitialValues: RestorePasswordValues = {
  username: '',
};
const restorePasswordSchema = yup.object({ username: yup.string().required() });

export const useRestorePasswordFormik = (
  values: RestorePasswordValues = signInInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<RestorePasswordValues>({
    initialValues: initialValues.current,
    validationSchema: restorePasswordSchema,
    onSubmit,
  });
};
