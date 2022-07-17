import React from 'react';
import { Checkbox } from '../../../../ui-components';
import styles from './Steps.module.scss';

interface StepOneProps {
  returnData: (volume: number, chapter: number) => void;
}
export const StepOne: React.FC<StepOneProps> = ({ returnData }) => {
  const [chapter, setChapter] = React.useState<number>(1);
  const [volume, setVolume] = React.useState<number>(1);
  const [checked, setChecked] = React.useState<boolean>(false);

  const toggleChapter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChapter((prev) =>
      Number(e.target.validity.valid ? e.target.value : prev)
    );
  };
  const toggleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume((prev) =>
      Number(e.target.validity.valid ? e.target.value : prev)
    );
  };

  const isChecked = (checked: boolean) => {
    checked && (setChapter(0), setVolume(1));
    setChecked(checked);
  };

  React.useEffect(() => {
    return returnData(volume, chapter);
  }, [volume, chapter, returnData]);
  return (
    <div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Volume number: </label>
        <input
          className={styles.input}
          disabled={checked}
          placeholder='Set volume number'
          value={volume}
          onChange={toggleVolume}
        />
        <p className={styles.info}>Last volume was 1 *</p>
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Chapter number: </label>
        <input
          className={styles.input}
          disabled={checked}
          placeholder='Set chapter number'
          value={chapter}
          onChange={toggleChapter}
        />
        <p className={styles.info}>Last chapter was 2 *</p>
      </div>

      <div className={styles.checkboxWrapper}>
        <Checkbox returnValue={isChecked} />
        <p>It&apos;s announcement</p>
      </div>
    </div>
  );
};
