import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

type Config = FormikConfig<SignInFormikValues>;

export interface SignInFormikValues {
  username: string;
  password: string;
}

export const signInInitialValues: SignInFormikValues = {
  username: '',
  password: '',
};

const signinSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(), 
});

export const useSignInFormik = (
  values: SignInFormikValues = signInInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<SignInFormikValues>({
    initialValues: initialValues.current,
    validationSchema: signinSchema,
    onSubmit,
  });
};
