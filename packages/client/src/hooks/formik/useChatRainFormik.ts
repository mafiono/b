import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import { CoinType } from '@betnomi/libs/types';
import { number, object, string } from 'yup';

type Config = FormikConfig<ChatRainFormikValues>;

export interface ChatRainFormikValues {
  coin: CoinType;
  amount?: number;
  message: string;
  persons: number;
}

export const chatRainInitialValues: ChatRainFormikValues = {
  coin: CoinType.bitcoin,
  amount: undefined,
  message: '',
  persons: 1,
};

const validationSchema = object().shape({
  coin: string().required(),
  amount: number().positive().required(),
  message: string().optional(),
  persons: number().positive().min(1).max(100)
    .required(),
});

export const useChatRainFormik = (
  values: ChatRainFormikValues = chatRainInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<ChatRainFormikValues>({
    initialValues: initialValues.current,
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });
};
