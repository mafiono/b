import { useFakeSelectOptions } from '@betnomi/libs/hooks/storybook/useFakeSelectOptions';
import {
  useCallback, useEffect, useMemo, useState, 
} from 'react';

export const useCountriesAutocomplete = (value: string) => {
  const { options } = useFakeSelectOptions();
  const [input, setInput] = useState(value);

  const selected = useMemo(() => options.find((item) => item.value === value), [
    value,
  ]);

  const variants = useMemo(() => options.filter(
    (option) => option.label.toLowerCase().indexOf(input.toLowerCase() || value.toLowerCase()) >= 0,
  ), [options, input, value]);

  const onSearch = useCallback((val: string) => setInput(val), [setInput]);

  useEffect(() => setInput(value), [value]);

  return { variants, onSearch, selected };
};
