import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

type Config = FormikConfig<SignUpFormikValues>;

export interface SignUpFormikValues {
  username: string;
  email: string;
  password: string;
  referralCode: string;
  terms: boolean;
}

export const signUpInitialValues: SignUpFormikValues = {
  username: '',
  email: '',
  password: '',
  referralCode: '',
  terms: false,
};

const signupSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(), 
  email: yup.string().required(), 
  terms: yup.boolean().required().oneOf([true], 'The terms and conditions must be accepted.'),
});

export const useSignUpFormik = (
  values: SignUpFormikValues = signUpInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<SignUpFormikValues>({
    initialValues: initialValues.current,
    validationSchema: signupSchema,
    onSubmit,
  });
};
