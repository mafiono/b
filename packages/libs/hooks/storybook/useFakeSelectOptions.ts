import { useMemo } from 'react';
import { Option } from '../../components/Autocomplete';

export const useFakeSelectOptions = () => {
  const options = useMemo<Option[]>(() => [
    { label: 'USA', value: 'USA' },
    { label: 'Cuba', value: 'Cuba' },
    { label: 'France', value: 'France' },
    { label: 'Grenada', value: 'Grenada' },
    { label: 'Italy ', value: 'Italy ' },
    { label: 'Mongolia', value: 'Mongolia' },
    { label: 'Uruguay', value: 'Uruguay' },
    { label: 'Niue', value: 'Niue' },
    { label: 'Russia', value: 'Russia' },
    { label: 'London', value: 'London' },
  ], []);
  
  return { options };
};
