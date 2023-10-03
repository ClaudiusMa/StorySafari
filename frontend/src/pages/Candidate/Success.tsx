import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stagebar from '../../components/Stagebar';
import Button from '../../components/Button';
import emailjs from 'emailjs-com'; // Import emailjs

const SuccessMessage: React.FC = () => {
  const [recruiterName, setRecruiterName] = useState(''); // Initialize state
  const router = useRouter();

  useEffect(() => {
    // Get the recruiterName and yourName from local storage
    const storedRecruiterName = localStorage.getItem('recruiterName');
    const yourName = localStorage.getItem('yourName');
    const yourEmail = localStorage.getItem('yourEmail');
    const recruiterEmail = localStorage.getItem('recruiterEmail');
    const question = localStorage.getItem('question');
    const gratuity = localStorage.getItem('gratuity');

    // Set recruiterName state
    setRecruiterName(storedRecruiterName);

    // Initialize emailjs
    emailjs.init("Y8du1A8GDvOvkEqgf");
    const templateParams = {  // Changed from var to const
      message: `Recruiter Name: ${storedRecruiterName}, Your Name: ${yourName}, Your Email: ${yourEmail}, Recruiter Email: ${recruiterEmail}, Question: ${question}, Gratuity: ${gratuity}`,
    };

    // Send the email
    emailjs.send('service_wbh3d7u', 'template_b4srohj', templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });

  }, []); // Empty dependency array ensures useEffect is only run once on mount

  const handleFinish = () => {
    router.push('/'); // Navigate back to the homepage
  };

  return (
    <div className='flex flex-col items-center mx-5'>
      <div className='mt-10' />
      <Stagebar
        title="Completed"
        subtitle='Feedback Request'
        status={`Contacting ${recruiterName}, you should receive feedback soon...`}
      />

      <div className='mt-10' />

      <div className='max-w-xl w-full'>
        <Button
          text='Back to Home'
          onClick={handleFinish}
        />
      </div>
    </div>
  );
};

export default SuccessMessage;
