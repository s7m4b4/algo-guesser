import * as React from 'react';

interface PillProps {
  text: string;
}

const Pill: React.FC<PillProps> = ({ text }) => {
  const className = (option: string) => {
    switch (option) {
      case 'Easy':
        return 'bg-green-200 text-green-900';

      case 'Medium':
        return 'bg-orange-200 text-orange-900';

      case 'Hard':
        return 'bg-red-200 text-red-900';

      default:
        return 'bg-gray-200 text-gray-900';
    }
  };

  return <span className={`${className(text)} rounded-lg px-2 text-xs py-0.5 font-bold`}>{text}</span>;
};

export default Pill;
