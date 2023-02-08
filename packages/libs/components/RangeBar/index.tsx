/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';
import styles from './styles.module.scss';

const STEP = 1;
const MIN = 0;
const MAX = 100;

const Labeled: React.FC = () => {
  const [values, setValues] = React.useState([0]);
  return (
    <div className={styles.wrap}>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{ ...props.style }}
            className={styles.track_wrap}
          >
            <div
              ref={props.ref}
              className={styles.track}
              style={{ background: getTrackBackground({ values, colors: ['#6AD035', '#212536'], min: MIN, max: MAX }) }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{ ...props.style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={styles.thumb}
          >
            <div
              className={styles.value}
            >
              {`${values[0]} %`}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Labeled;
