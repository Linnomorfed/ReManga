import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { CheckMarkSvg } from '../../../assets/svgs';
import { BlueBtn } from '../BlueBtn';
import styles from './Stepper.module.scss';
import { useContextualRouting } from 'next-use-contextual-routing';

interface StepperProps {
  children: React.ReactChild | React.ReactNode;
  steps: { id: number; text: string }[];
  returnStep: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  children,
  steps,
  returnStep,
}) => {
  const router = useRouter();
  const { makeContextualHref, returnHref } = useContextualRouting();
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  const nextStep = () => {
    currentStep <= steps.length - 1 && setCurrentStep(currentStep + 1);
  };
  const previousStep = () => {
    currentStep >= steps.length - 1 && setCurrentStep(currentStep - 1);
  };
  const as = router.asPath;
  const href = router.asPath + `?step${currentStep}`;

  React.useEffect(() => {
    returnStep(currentStep);
  }, [currentStep, returnStep]);
  return (
    <div>
      <div className={styles.stepper}>
        {steps.map((step) => (
          <React.Fragment key={step.id}>
            <div className={styles.step}>
              <span
                className={classNames(
                  styles.stepperCircle,
                  `${currentStep < step.id ? styles.stepDisabled : ''}`
                )}>
                {currentStep > step.id ? (
                  <CheckMarkSvg h={20} fill='white' />
                ) : (
                  <p>{step.id}</p>
                )}
              </span>
              <p>{step.text}</p>
            </div>
            <div className={styles.stepperDividerWrapper}>
              <span
                className={classNames(
                  styles.stepperDivider,
                  `${
                    currentStep <= step.id ? styles.stepperDividerDisabled : ''
                  }`
                )}></span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={styles.stepperContainer}>{children}</div>

      <BlueBtn onClick={previousStep} disabled={currentStep === 1}>
        Previous
      </BlueBtn>

      <BlueBtn onClick={nextStep} disabled={currentStep === steps.length}>
        Next
      </BlueBtn>
    </div>
  );
};
