import React from 'react';
import styles from './Switch.module.scss';
interface SwitchProps {
  checked: boolean;
  toogleSwitch: () => void;
}

export const Switch: React.FC<SwitchProps> = React.memo(
  ({ checked, toogleSwitch }) => {
    return (
      <label className={styles.togleSwitch}>
        <input
          type='checkbox'
          className={styles.checkbox}
          checked={checked}
          onChange={toogleSwitch}
        />
        <span className={styles.switch} />
      </label>
    );
  }
);

Switch.displayName = 'Switch';
