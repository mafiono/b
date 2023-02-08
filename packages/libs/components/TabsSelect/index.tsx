/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, {
  PropsWithChildren, useState, useCallback, useEffect, useMemo, FC,
} from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import classNames from 'classnames';
import { FontIcon, FontIconName } from '../FontIcon';
import { TextInputWrap } from '../TextInputWrap';
import { usePopperDropdown } from '../../hooks/ui/usePopperDropdown';
import styles from './styles.module.scss';
import { useFocusEvent } from '../../hooks/useFocusEvent';

interface ContainerProps extends PropsWithChildren<any> {
  active: number;
  onChange: (val: number) => void;
  controlled?: boolean;
}

interface ValueProps {
  value: string;
  icon: FontIconName;
}

function TabsSelect({
  active = 0,
  onChange = () => {},
  children,
  controlled,
}: ContainerProps) {
  const [current, setCurrent] = useState(active);
  const handleChange = useCallback(
    (val: number) => {
      const indexTab = children.findIndex((child: any) => child.props.value === val);
      onChange(indexTab);
  
      if (controlled) {
        return;
      }
  
      setCurrent(val);
    },
    [setCurrent, onChange, controlled],
  );

  useEffect(() => {
    setCurrent(active);
  }, [active]);

  const pages = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );
  const modifiers = usePopperDropdown(0, 10, true);
  const { onFocus, offFocus, focused } = useFocusEvent();

  return (
    <Manager>
      <TextInputWrap className={styles.specifiv}>
        <Reference>
          {({ ref }) => (
            <button className={styles.select} onFocus={onFocus} onBlur={offFocus} type="button" ref={ref}>
              {pages[current]}
              <FontIcon name={FontIconName.IconArrowBottom} className={styles.arrow_icon} size={16} />
            </button> 
          )}
        </Reference>
      </TextInputWrap>
      <Popper modifiers={modifiers} placement="bottom-start">
        {({ ref, style }) => (
          <div
            className={classNames(styles.float, { [styles.hidden]: !focused })}
            ref={ref}
            style={style}
          >
            {children.filter((child: FC) => child !== pages[current]).map((child: any) => (
              <button className={styles.button} key={child.props.value} onClick={() => handleChange(child.props.value)}>
                {child}
              </button>
            ))}
          </div>
        )}
      </Popper>
    </Manager>
  );
}
const Value: FC<ValueProps> = ({ value, icon }) => (
  <div className={styles.tab}>
    <FontIcon name={icon} size={24} />
    <span>{value}</span>
  </div>
); 

TabsSelect.Value = Value;

export { TabsSelect };
