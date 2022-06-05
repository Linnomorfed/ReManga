import React from 'react';
import styles from './UserPopup.module.scss';
import coin from '../../../assets/coin.png';
import ticket from '../../../assets/ticket.png';
import Image from 'next/image';
import UserAvatar from '../../UI/UserAvatar';
import Link from 'next/link';
import { destroyCookie } from 'nookies';
import { useAppDispatch } from '../../../hooks/redux';
import { clearUserData } from '../../../redux/slices/userSlice';

interface UserPopupProps {
  nickname: string;
  id: number;
}

const UserPopup: React.FC<UserPopupProps> = ({ nickname, id }) => {
  const dispatch = useAppDispatch();

  const logout = () => {
    destroyCookie({}, 'remangaToken');
    dispatch(clearUserData());
  };
  return (
    <div className={styles.popup}>
      <Link href={`/user/${id}`}>
        <a>
          <div className={styles.header}>
            <UserAvatar size='medium' nickname={nickname} />
            <div className={styles.userNameWrapper}>
              <div className={styles.userName}>{nickname}</div>
              <div className='d-flex'>
                <div className={styles.balanceIconWrapper}>
                  <div className={styles.balanceIcon}>
                    <Image src={coin} alt='' />
                  </div>

                  <b>0</b>
                </div>
                <div className={styles.balanceIconWrapper}>
                  <div className={styles.balanceIcon}>
                    <Image src={ticket} alt='' />
                  </div>
                  <b>0</b>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <div>
        <button className={styles.btn}>Top up balance</button>
      </div>
      <div>
        <button className={styles.btn} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserPopup;
