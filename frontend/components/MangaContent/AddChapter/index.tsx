import React from 'react';
import { ChapterSteps } from '../../../utils/static/ChapterSteps';
import { ModalBlock } from '../../ModalBlock';
import { BlueBtn, Stepper } from '../../../ui-components';
import { StepOne } from './Steps/StepOne';
import { StepTwo } from './Steps/StepTwo';

interface AddChaptersProps {
  mangaId: number;
}

export const AddChapters: React.FC<AddChaptersProps> = ({ mangaId }) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [chapterNumber, setChapterNumber] = React.useState(1);
  const [volumeNumber, setVolumeNumber] = React.useState(1);
  const [chapterPanelVisibility, setChapterPanelVisibility] =
    React.useState<boolean>(false);

  const returnCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const returnData = (volume: number, chapter: number) => {
    setVolumeNumber(volume);
    setChapterNumber(chapter);
  };

  const togglePagelVisibility = () => {
    setChapterPanelVisibility(!chapterPanelVisibility);
  };

  return (
    <>
      <BlueBtn type='manga' onClick={togglePagelVisibility}>
        Add new chapter
      </BlueBtn>
      {chapterPanelVisibility && (
        <ModalBlock
          variant='large'
          toggleModalVisibility={togglePagelVisibility}
          visible={chapterPanelVisibility}
          setVisible={setChapterPanelVisibility}>
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
                      close={togglePagelVisibility}
                    />
                  );
                default:
                  return <StepOne returnData={returnData} />;
              }
            })()}
          </Stepper>
        </ModalBlock>
      )}
    </>
  );
};
