import React from 'react';
import FlipInText from './FlipinText';

interface StagebarProps {
    title: string;
    subtitle: string;
    status: string;
}

const Stagebar: React.FC<StagebarProps> = ({ title, subtitle, status }) => {
    return (
        <div className='max-w-xl w-full'>

            <p className='font-light '>{subtitle}</p>

            <div className='flex flex-row items-center border-y border-dark py-2 my-2'>
                <div className='h-5 w-4 md:w-5 bg-darkgrey' />
                <p className='font-light text-2xl ml-2'>{title}</p>
            </div>
            <div className='font-medium text-center'>
                <FlipInText text={status} />
            </div>


        </div>

    );
};

export default Stagebar;