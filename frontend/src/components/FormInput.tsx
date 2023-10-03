import React from 'react';

interface FormInputProps {
    prompt: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ prompt, placeholder = '', value, onChange}) => {
    return (
        <div className='w-full max-w-xl '>
            <div className='flex items-center bg-lightgrey  p-2 '>
                <div className='w-2 h-5 bg-darkgrey'></div>
                <p className='mx-2'>{prompt}</p>
            </div>
            <div className='mt-2' />
            <textarea
                className='h-60 w-full bg-lightgrey p-2 text-left resize-none focus:outline-none focus:ring-2 focus:ring-darkgrey'
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default FormInput;
