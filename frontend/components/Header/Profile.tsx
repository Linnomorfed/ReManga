import classNames from 'classnames';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import useOutsideClick from '../../hooks/useOutsideClick';
import { selectUserData } from '../../redux/User/selectors';
import { UserAvatar } from '../../ui-components/UserAvatar';
import styles from './Header.module.scss';
import { UserPopup } from './UserPopup';

export const Profile = () => {
  const userData = useAppSelector(selectUserData);

  const [visibleUserPopup, setVisibleUserPopup] = React.useState(false);

  const { componentRef, toggleVisibility } = useOutsideClick(
    visibleUserPopup,
    setVisibleUserPopup
  );
  if (userData) {
    return (
      <div className={styles.relative} ref={componentRef}>
        <button
          onClick={toggleVisibility}
          className={classNames(styles.btn, styles.btnSpace)}>
          <UserAvatar nickname={userData.nickname} />
        </button>

        {visibleUserPopup && (
          <UserPopup nickname={userData.nickname} id={userData.id} />
        )}
      </div>
    );
  } else {
    return null;
  }
};
