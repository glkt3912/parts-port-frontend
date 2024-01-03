import React, { ChangeEvent } from 'react';

type FormInputProps = {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
};

type Option = {
  id: string | number;
  name: string;
};

type FormSelectProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
  error?: string;
};

export const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  className,
  error,
}: FormInputProps) => (
  <div className={className}>
    <label htmlFor={name}>{label}:</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value || ''}
      onChange={onChange}
    />
    {error && <p className="error">{error}</p>}
  </div>
);

export const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  className,
  error,
}: FormSelectProps) => (
  <div className={className}>
    <label htmlFor={name}>{label}:</label>
    <select name={name} id={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
    {error && <p className="error">{error}</p>}
  </div>
);
