import Image from 'next/image';
import React from 'react';
import {
  ChangeAvatarSvg,
  CommentSvg,
  HeartSvg,
  ShowPassSvg,
} from '../../assets/svgs';
import { BlueBtn } from '../UI';
import styles from './UserPanel.module.scss';
import avatar from '/assets/avatar.jpg';
import coin from '../../assets/coin.png';
import ticket from '../../assets/ticket.png';
import ChangeNickname from './ChangeNickname';

interface HeaderProps {
  nickname: string;
  currentUserId: number | undefined;
  userId: number;
  leftCommentsCount: number;
  likedChapters: number;
}

const Header: React.FC<HeaderProps> = ({
  nickname,
  currentUserId,
  userId,
  leftCommentsCount,
  likedChapters,
}) => {
  return (
    <div className={styles.header}>
      <div className='container'>
        <div className='d-flex'>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <Image
                src={avatar}
                className={styles.avatarImg}
                alt={nickname + "'s avatar"}
                width={130}
                height={130}
              />
              <span className={styles.avatarSpan}>
                <ChangeAvatarSvg h={24} w={24} />
              </span>
            </div>
          </div>
          <div className={styles.userRightSection}>
            <div className={styles.userInfoTop}>
              <div className={styles.userInfo}>
                <ChangeNickname nickname={nickname} userId={userId} />
                <span className={styles.userId}>ID: {userId}</span>
              </div>
              <div>
                {userId === currentUserId && (
                  <BlueBtn type='manga'>Settings</BlueBtn>
                )}
              </div>
            </div>
            <div className={styles.userInfoBottom}>
              <div title='Balance' className={styles.userStatElement}>
                <Image src={coin} height={23} width={23} alt='Balance' />
                <span>0</span>
              </div>
              <div title='Tickets' className={styles.userStatElement}>
                <Image src={ticket} height={23} width={23} alt='Tickets' />
                <span>0</span>
              </div>
              <div title='Chapters read' className={styles.userStatElement}>
                <ShowPassSvg fill='#fff' w={22} h={22} />
                <span>9823</span>
              </div>
              <div title='Liked chapters' className={styles.userStatElement}>
                <HeartSvg fill='#fff' w={18} h={18} />
                <span>{likedChapters}</span>
              </div>
              <div title='Left comments' className={styles.userStatElement}>
                <CommentSvg fill='#fff' w={18} h={18} />
                <span>{leftCommentsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
