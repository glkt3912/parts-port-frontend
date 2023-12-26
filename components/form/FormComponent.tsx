import React, { ChangeEvent } from "react";

type FormInputProps = {
    label: string;
    type: string;
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
};

export const FormInput = ({ label, type, name, value, onChange }: FormInputProps) => (
    <div>
        <label htmlFor={name}>{label}:</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
        />
    </div>
);

export const FormSelect = ({ label, name, value, onChange, options }: FormSelectProps) => (
    <div>
        <label htmlFor={name}>{label}:</label>
        <select name={name} id={name} value={value} onChange={onChange}>
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
);