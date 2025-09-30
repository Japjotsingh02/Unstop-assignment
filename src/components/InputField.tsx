import React from "react";

interface InputFieldProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  icon?: string;
  rightIcon?: React.ReactNode;
  error?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder = " ",
  label,
  icon,
  rightIcon,
  error,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        {icon && (
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"
          />
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          className="peer w-full pl-10 pr-3 py-5 2xl:py-6.5 bg-[#F4F4F4] rounded-2xl font-bold focus:outline-none"
        />
        <label
          htmlFor={name}
          className="absolute left-10 text-gray-500 pointer-events-none transition-all top-2 text-[10px] 2xl:text-xs
          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-sm
          2xl:peer-placeholder-shown:text-base
          peer-focus:top-2.5
          peer-focus:text-[10px]
          2xl:peer-focus:text-xs
          peer-focus:text-[#1C1B1F]"
        >
          {label}
        </label>
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs 2xl:text-sm mt-2">{error}</p>}
    </div>
  );
};

export default InputField;
