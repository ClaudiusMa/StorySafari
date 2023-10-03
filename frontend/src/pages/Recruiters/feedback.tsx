import React, { useState } from 'react';
import AppreciationMessage from '../../components/recruiter/AppreciationMessage';
import ReasonInput from '../../components/recruiter/ReasonInput';
import AdviceInput from '../../components/recruiter/AdviceInput';
import FeedbackPreview from '../../components/recruiter/FeedbackPreview';
import GratuitySend from '../../components/recruiter/GratuitySend';
import Confirmation from '@/components/recruiter/Confirmation';

const FeedbackPage: React.FC = () => {
  const [step, setStep] = useState(0);

  const handleStart = () => {
    setStep(1);
  };

  const handleContinueToAdvice = () => {
    setStep(2);
  };

  const handleContinueToPreview = () => {
    setStep(3);
  };

  const handleSend = () => {
    setStep(4); // move to the next step
  };

  const handleToConfirmation = () => {
    setStep(5); // move to the next step
  };

  return (
    <div>
      {step === 0 && <AppreciationMessage onStart={handleStart} />}
      {step === 1 && <ReasonInput onContinue={handleContinueToAdvice} />}
      {step === 2 && <AdviceInput onContinue={handleContinueToPreview} />}
      {step === 3 && <FeedbackPreview onSend={handleSend} />}
      {step === 4 && <GratuitySend onNext={handleToConfirmation} />}
      {step === 5 && <Confirmation />}
    </div>
  );
};

export default FeedbackPage;
