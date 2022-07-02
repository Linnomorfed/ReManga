import classNames from 'classnames';
import React from 'react';
import { EditSvg } from '../../assets/svgs';
import { useAppSelector } from '../../hooks/redux';
import { selectUserData } from '../../redux/User/selectors';
import { Api } from '../../services/api';
import { ModalBlock } from '../ModalBlock';
import { ModalBtn } from '../UI';
import styles from './UserPanel.module.scss';

interface ChangeNicknameProps {
  nickname: string;
  userId: number;
}

export const ChangeNickname: React.FC<ChangeNicknameProps> = ({
  nickname,
  userId,
}) => {
  const userData = useAppSelector(selectUserData);

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [userNickname, setUserNickname] = React.useState<string>(nickname);

  const toggleVisibility = () => {
    userData?.id === userId && setShowModal(!showModal);
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  const updateNickname = async () => {
    try {
      userData?.id === userId &&
        (await Api().user.updateCurrentUser(userData.id, {
          nickname: userNickname,
        }));
    } catch (err) {
      console.warn('Updating nickname ', err);
    } finally {
      toggleVisibility();
    }
  };
  return (
    <>
      <div className={styles.nicknameContainer} onClick={toggleVisibility}>
        <h4
          className={classNames(
            styles.nickname,
            `${userData?.id === userId ? styles.nicknameOwner : ''}`
          )}>
          {nickname}
        </h4>
        {userData?.id === userId && <EditSvg fill='#fff' w={22} h={22} />}
      </div>
      {showModal && (
        <ModalBlock
          title='Change nickname'
          toggleModalVisibility={toggleVisibility}
          visible={showModal}
          setVisible={setShowModal}>
          <div>
            <div className={styles.changeNicknameInputWrapper}>
              <input
                type='text'
                value={userNickname}
                onChange={changeNickname}
                className={styles.changeNicknameInput}
              />
            </div>
            <ModalBtn onClick={updateNickname}>Change</ModalBtn>
          </div>
        </ModalBlock>
      )}
    </>
  );
};
