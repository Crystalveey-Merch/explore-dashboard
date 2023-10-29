import React from 'react';

interface InputProps {
    name: string;
    type: string;
    value: string | string[] | number;
    onChange: undefined | ((e: React.ChangeEvent<HTMLInputElement>) => void);
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    name,
    type,
    value,
    onChange,
    placeholder,
    required,
    className = '',
    disabled = false,
}) => {
    return (
        <div>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 placeholder:text-gray-900 placeholder:opacity-60 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out ${className}`}
            />
        </div>
    );
};

export default Input;
