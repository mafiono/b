import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import classNames from 'classnames';
import { debounce } from 'throttle-debounce';
import { TextInput, TextInputProps } from '../TextInput';
import styles from './styles.module.scss';
import { useFocusEvent } from '../../hooks/useFocusEvent';
import { usePopperDropdown } from '../../hooks/ui/usePopperDropdown';

export interface Option<T extends string = string> { value: T, label: string }

export type AutocompleteProps = Omit<TextInputProps, 'value' | 'onChange'> & {
  variants: Option[];
  value?: Option;
  customRenderer?: (
    current: Option
  ) => JSX.Element;
  onSearch: (val: string) => void;
  onChange: (val: Option) => void;
  setVariants?: (val: Option[]) => void;
};

const Autocomplete: FC<AutocompleteProps> = ({ onSearch,
  variants,
  onChange,
  customRenderer,
  value,
  setVariants,
  ...props }) => {
  const [input, setInput] = useState<string>(value?.label || '');
  const { onFocus, onBlur, focused } = useFocusEvent();
  const modifiers = usePopperDropdown(0, 10, true);

  useEffect(() => {
    if (focused) {
      return;
    }

    setInput(value?.label || '');
  }, [value, focused]);

  const onSearchChange = useCallback(
    debounce(300, false, (val: string) => onSearch(val || '')),
    [onSearch],
  );

  useEffect(() => {
    if (!focused) {
      return;
    }

    onSearchChange(input);
  }, [input, focused]);

  const onInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value || ''),
    [setInput],
  );

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref} className={styles.wrapper}>
            <TextInput
              {...props}
              onFocus={onFocus}
              onBlur={onBlur}
              value={input}
              onChange={onInput}
            />
          </div>
        )}
      </Reference>

      <Popper modifiers={modifiers}>
        {({ ref, style }) => (
          <div
            className={classNames(styles.float, { [styles.hidden]: !focused || !variants?.length })}
            ref={ref}
            style={style}
          >
            <div className={styles.list}>
              {!!variants &&
                variants.map((variant) => (
                  <button
                    key={variant.value}
                    className={styles.variant}
                    onMouseDown={() => onChange(variant)}
                  >
                    {customRenderer
                      ? customRenderer(variant)
                      : variant.label}
                  </button>
                ))}
            </div>
          </div>
        )}
      </Popper>
    </Manager>
  );
};

export { Autocomplete };
