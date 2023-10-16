import React from 'react';

interface ButtonProps {
  lable: string;
  action?: () => void;
  type?: 'submit' | 'button' 
}

const Button: React.FC<ButtonProps> = ({ lable, action=() => {}, type='button' }) => {
  return (
    <button
      className="bg-primary-400 hover:bg-primary-300 active:scale-[99%] active:translate-y-1 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      onClick={action}
      type={type}
    >
      {lable}
    </button>
  );
};

export default Button;