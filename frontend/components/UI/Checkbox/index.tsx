import React from 'react';
import { CheckboxCheckedSvg, CheckboxSvg } from '../../../assets/svgs';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useDidMountEffect from '../../../hooks/useDidMountEffect';
import { showAuthModal } from '../../../redux/Auth/slice';
import { selectUserData } from '../../../redux/User/selectors';
import styles from './Checkbox.module.scss';
interface CheckboxProps {
  returnValue: (checked: boolean) => void;
  loggedInOnly?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  returnValue,
  loggedInOnly = false,
}) => {
  const [checked, setChecked] = React.useState(false);

  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  const toggleAuthModalVisibility = () => {
    dispatch(showAuthModal());
  };

  const toggleCheckBox = () => {
    loggedInOnly
      ? userData
        ? setChecked(!checked)
        : toggleAuthModalVisibility()
      : setChecked(!checked);
  };

  useDidMountEffect(() => {
    returnValue(checked);
  }, [checked]);

  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        type='checkbox'
        onChange={toggleCheckBox}
      />

      {checked ? (
        <CheckboxCheckedSvg fill={'#4e6baf'} w={24} h={24} />
      ) : (
        <CheckboxSvg fill={'white'} w={24} h={24} />
      )}
    </div>
  );
};
