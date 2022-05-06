import { FC } from 'react';
import { DiscordSvg, TelegramSvg, TiktokSvg, VKSvg } from '../../assets/svgs';
import styles from './Socials.module.scss';

const Socials: FC = () => {
  return (
    <div className={styles.socials}>
      <VKSvg fill='white' w={25} h={25} />
      <DiscordSvg fill='white' w={25} h={25} />
      <TelegramSvg fill='white' w={25} h={25} />
      <TiktokSvg fill='white' w={25} h={25} />
    </div>
  );
};

export default Socials;
