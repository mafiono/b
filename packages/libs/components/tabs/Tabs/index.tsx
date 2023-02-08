import React, {
  FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState, 
} from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface ContainerProps extends PropsWithChildren<any> {
  active?: number;
  onChange?: (val: number) => void;
  controlled?: boolean;
}

interface HeadProps {
  className?: string;
  tabClassName?: string;
}

const TabContext = React.createContext<{
  current: number;
  handleChange:(val: number) => void;
}>({
      current: 0,
      handleChange: () => {},
    });

export const useTabs = () => useContext(TabContext);

function Tabs({
  active = 0,
  onChange = () => {},
  children,
  controlled,
}: ContainerProps) {
  const [current, setCurrent] = useState(active);
  const handleChange = useCallback(
    (val: number) => {
      onChange(val);

      if (controlled) {
        return;
      }

      setCurrent(val);
    },
    [setCurrent, onChange, controlled],
  );

  const value = useMemo(() => ({ current, handleChange }), [
    current,
    handleChange,
  ]);

  useEffect(() => {
    setCurrent(active);
  }, [active]);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

const Content: FC<ContainerProps> = ({ children }) => {
  const { current } = useTabs();
  const pages = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );

  return <>{pages[current] || null}</>;
};

const Head: FC<HeadProps> = ({ className = '', tabClassName, children }) => {
  const { current, handleChange } = useTabs();
  const tabs = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );

  /* eslint-disable react/no-array-index-key */
  return (
    <div className={classNames(styles.tabs, styles[className] )}>
      {tabs.map((tab, i) => (
        <button
          onClick={() => handleChange(i)}
          className={classNames(
            styles.tab,
            { [styles.active]: current === i, active: current === i },
            tabClassName,
          )}
          key={i}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

Tabs.Content = Content;
Tabs.Head = Head;

export { Tabs };
