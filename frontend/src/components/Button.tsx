import React from 'react';

interface ButtonProps {
    text: string;
    color?: 'yellow' | 'grey'; // defined colors
    round?: string;
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const colorClasses = {
  yellow: 'font-bold bg-lightyellow hover:bg-yellow',
  grey: 'font-medium  bg-lightgrey hover:bg-darkgrey',
};

const Button: React.FC<ButtonProps> = (props) => {
    const { text, color = 'grey', round = 'rounded-none', onClick } = props;
    const colorClass = colorClasses[color];

    return (
        <button className={`py-2 text-dark w-full max-w-xl ${colorClass} ${round}`}  onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
