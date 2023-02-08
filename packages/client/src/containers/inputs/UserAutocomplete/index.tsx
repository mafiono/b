import React, { FC, useEffect, useMemo } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Autocomplete,
  AutocompleteProps } from '@betnomi/libs/components/Autocomplete';
import { useUserAutocomplete } from '../../../hooks/autocomplete/useUserAutocomplete';

interface IProps extends Omit<AutocompleteProps, 'onSearch' | 'variants' | 'placeholder' | 'left'> {
  label?: string;
  exclude?: string[];
}

const UserAutocomplete: FC<IProps> = ({ label, exclude, ...props }) => {
  const { onSearch, variants, setVariants } = useUserAutocomplete();

  useEffect(() => {
    if (variants && variants.length) {
      setVariants([]);
    }
  }, [props.value]);

  const variantsWithoutExcluded = useMemo(() => {
    if (!exclude?.length) {
      return variants;
    }

    return variants.filter(({ value }) => !exclude.includes(value));
  }, [exclude, variants]);

  return (
    <Autocomplete
      {...props}
      onSearch={onSearch}
      variants={variantsWithoutExcluded}
      placeholder={label}
      left={<FontIcon name={FontIconName.User} size={16} />}
    />
  );
};

export { UserAutocomplete };
