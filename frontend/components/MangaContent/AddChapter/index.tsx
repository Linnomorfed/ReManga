import React from 'react';
import { ChapterSteps } from '../../../utils/static/ChapterSteps';
import { ModalBlock } from '../../ModalBlock';
import { Stepper } from '../../UI';
import { StepOne } from './Steps/StepOne';
import { StepTwo } from './Steps/StepTwo';

interface AddChaptersProps {
  mangaId: number;
  toggleVisibility: () => void;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddChapters: React.FC<AddChaptersProps> = ({
  mangaId,
  toggleVisibility,
  state,
  setState,
}) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [chapterNumber, setChapterNumber] = React.useState(1);
  const [volumeNumber, setVolumeNumber] = React.useState(1);

  const returnCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const returnData = (volume: number, chapter: number) => {
    setVolumeNumber(volume);
    setChapterNumber(chapter);
  };

  return (
    <ModalBlock
      variant='large'
      toggleModalVisibility={toggleVisibility}
      visible={state}
      setVisible={setState}>
      <Stepper steps={ChapterSteps} returnStep={returnCurrentStep}>
        {(() => {
          switch (currentStep) {
            case 1:
              return <StepOne returnData={returnData} />;
            case 2:
              return (
                <StepTwo
                  mangaId={mangaId}
                  volume={volumeNumber}
                  chapter={chapterNumber}
                  close={toggleVisibility}
                />
              );
            default:
              return <StepOne returnData={returnData} />;
          }
        })()}
      </Stepper>
    </ModalBlock>
  );
};
