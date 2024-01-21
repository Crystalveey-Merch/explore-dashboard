import React from 'react';

type ButtonProps = {
    onClick: undefined | (() => void);
    label: string | React.ReactNode;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

export const WhiteButton: React.FC<ButtonProps> = ({
    onClick,
    label,
    disabled = false,
    className = '',
    type = 'button',
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-white text-gray-700 font-bold py-2 px-4 rounded-lg shadow border border-solid hover:bg-[#dfe2e7] hover:border hover:border-[#d0d5dd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 focus:ring-offset-gray-100 disabled:bg-[#FFFFFF] disabled:text-[#D0D5DD] disabled:cursor-not-allowed transition duration-500 ease-in-out ${className}`}
            type={type}
        >
            {label}
        </button>
    );
};
