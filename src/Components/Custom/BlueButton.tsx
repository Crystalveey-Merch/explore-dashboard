import React from 'react';

type ButtonProps = {
    onClick: undefined | (() => void);
    label: string | React.ReactNode;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

export const BlueButton: React.FC<ButtonProps> = ({
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
            className={`bg-blue-600 text-white text-base font-medium py-2 px-4 rounded-lg shadow border border-blue-600 hover:bg-blue-700 hover:border hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100 disabled:bg-blue-100 disabled:cursor-not-allowed transition duration-500 ease-in-out ${className}`}
            type={type}
        >
            {label}
        </button>
    );
};
