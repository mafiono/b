import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import { object, string } from 'yup';

type Config = FormikConfig<ChatFormikValues>;

export interface ChatFormikValues {
  text: string;
}

export const chatInitialValues: ChatFormikValues = {
  text: '',
};

const validationSchema = object().shape({
  text: string().required(),
});

export const useChatFormik = (
  values: ChatFormikValues = chatInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<ChatFormikValues>({
    initialValues: initialValues.current,
    validationSchema,
    onSubmit,
  });
};
