import Image from 'next/image';
import React from 'react';
import styles from './UserAvatar.module.scss';
import avatar from '../../../assets/avatar.jpg';
import classNames from 'classnames';

interface UserAvatarProps {
  avatarUrl?: string;
  nickname: string;
  size?: 'medium' | 'default';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  avatarUrl,
  nickname,
  size = 'default',
}) => {
  const CorrectNickname = nickname.replace(/[^a-zA-Z ]/g, '');
  return (
    <div
      className={classNames(
        styles.size,
        `${size === 'medium' && styles.sizeMd}`
      )}>
      {avatarUrl ? (
        <Image src={avatarUrl} alt='UserAvatar' className={styles.avatar} />
      ) : (
        <div
          className={classNames(
            styles.avatar,
            styles.avatarFake,
            styles.size,
            `${size === 'medium' && styles.sizeMd}`
          )}>
          <span>{CorrectNickname[0]}</span>
        </div>
      )}
    </div>
  );
};
