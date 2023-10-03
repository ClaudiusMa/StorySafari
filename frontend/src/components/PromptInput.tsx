import React from 'react';

interface PromptInputProps {
    prompt: string;
    placeholder: string;
    value: string;
    displayBox?: boolean;
    onChange: (value: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, placeholder, value, onChange, displayBox }) => {
    return (
      <div className='flex items-center bg-lightgrey p-2 w-full max-w-xl '>
        {displayBox && <div className='w-2 h-5 bg-darkgrey'></div>}
        <p className='mx-2'>{prompt}</p>
        <input
          type="text"
          className='flex-grow text-right bg-transparent outline-none'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };

export default PromptInput;