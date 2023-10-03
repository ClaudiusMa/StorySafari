import React, { useState } from 'react';
import RecruiterInfo from '../../components/candidate/Recruiternfo';
import QuestionInput from '../../components/candidate/QuestionInput';
import GratuityInput from '../../components/candidate/GratuityInput';

const RequestFeedback: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleRecruiterInfo = (recruitername: string, recruiteremail: string, yourname: string, youremail: string) => {
    localStorage.setItem('recruiterName', recruitername);
    localStorage.setItem('yourName', yourname);
    localStorage.setItem('recruiterEmail', recruiteremail);
    localStorage.setItem('yourEmail', youremail);
    setStep(2);
  };

  const handleQuestion = (userQuestion: string) => {
    localStorage.setItem('question', userQuestion);
    setStep(3);
  };

  const handleGratuity = (gratuity: number) => {
    localStorage.setItem('gratuity', gratuity.toString());
  };

  return (
    <div>
      {step === 1 && <RecruiterInfo onNext={handleRecruiterInfo} />}
      {step === 2 && <QuestionInput onNext={handleQuestion} />}
      {step === 3 && <GratuityInput onNext={handleGratuity} />}
    </div>
  );
};

export default RequestFeedback;
