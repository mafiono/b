import { useCallback, useRef, useState } from 'react';
import { Canceler } from 'axios';
import { Option } from '@betnomi/libs/components/Autocomplete';
import { getAutocompleteUsers, UserFindResponse } from '../../utils/api/autocomplete';

const transformResultToVariants = (
  data: UserFindResponse,
): Option[] =>
  data.list.map((item) => ({ value: item.userId, label: item.login }));

export const useUserAutocomplete = () => {
  const [variants, setVariants] = useState<Option[]>([]);
  const canceler = useRef<Canceler>();

  const onSearch = useCallback((search: string) => {
    if (canceler.current) {
      canceler.current();
    }

    const fetcher = getAutocompleteUsers(search);

    if (!fetcher) {
      setVariants([]);
      return;
    }

    const { cancel, request } = fetcher;
    canceler.current = cancel;

    request
      .then((result) => transformResultToVariants(result.data))
      .then(setVariants)
      .catch(() => setVariants([]));
  }, [canceler, canceler.current, setVariants]);

  return {
    variants, onSearch, setVariants, cancel: canceler,
  };
};
