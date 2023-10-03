import React from 'react';
import { useNavigate} from 'react-router-dom';

const Previous: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className='font-medium' onClick={goBack}>Previous</button>
  );
};

export default Previous;
