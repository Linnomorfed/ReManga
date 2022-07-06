import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { selectMangaData } from '../../../redux/MangaData/selectors';
import { selectSortByData } from '../../../redux/SortBy/selectors';
import { Api } from '../../../services/api';
import { RateList } from '../../../utils/static/RateList';
import { ModalBlock } from '../../ModalBlock';
import { RateElement } from './RateElement';

interface RatePanelProps {
  toggleModalVisibility: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mangaId: number;
  setMangaRating: React.Dispatch<React.SetStateAction<number>>;
  setMangaVotesCount: React.Dispatch<React.SetStateAction<number>>;
  mangaVotesCount: number;
}

export const RatePanel: React.FC<RatePanelProps> = ({
  toggleModalVisibility,
  setMangaRating,
  setMangaVotesCount,
  mangaVotesCount,
  visible,
  setVisible,
  mangaId,
}) => {
  const { ratedByUser } = useAppSelector(selectMangaData);

  const sendRate = async (rate: number) => {
    try {
      if (ratedByUser) {
        const updatedRating = await Api().rating.updateRating(ratedByUser.id, {
          rate,
          mangaId,
        });
      } else {
        const rating = await Api().rating.rateManga({
          rate,
          mangaId,
        });
        setMangaRating(
          (prev) =>
            +Number(
              (prev * mangaVotesCount + rate) / (mangaVotesCount + 1)
            ).toFixed(1)
        );
        setMangaVotesCount((prev) => prev + 1);
      }
    } catch (err) {
      console.warn('Rate ', err);
    } finally {
      toggleModalVisibility();
    }
  };
  return (
    <ModalBlock
      toggleModalVisibility={toggleModalVisibility}
      visible={visible}
      setVisible={setVisible}
      title='Rate'>
      {RateList.map((rate) => (
        <RateElement
          key={rate.value}
          value={rate.value}
          text={rate.text}
          onClick={sendRate}
          ratedByUser={ratedByUser}
        />
      ))}
    </ModalBlock>
  );
};
