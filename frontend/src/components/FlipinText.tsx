import React from 'react';


interface FlipInTextProps {
  text: string;
}

const FlipInText: React.FC<FlipInTextProps> = ({ text }) => {
  return (
    <span>
      {text.split('').map((char, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.08}s` }} className="flip-in">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default FlipInText;
