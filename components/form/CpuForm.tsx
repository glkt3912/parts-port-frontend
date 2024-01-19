import React, { useState } from 'react';
import { FormInput } from './FormComponent';
import { Cpu } from './../../types';

type CpuFormProps = {
  formData: Cpu;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CpuForm = ({ formData, handleChange }: CpuFormProps) => {
  const [errors, setErrors] = useState({});

  const validate = (name: string, value: any) => {
    switch (name) {
      case 'wattage':
        if (value < 0) {
          setErrors({
            ...errors,
            wattage: 'Wattage must be a positive number',
          });
        } else {
          let newErrors = { ...errors };
          delete newErrors.wattage;
          setErrors(newErrors);
        }
        break;
      // 他のフィールドに対するバリデーションもここに追加
      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validate(name, value);
    handleChange(e);
  };
  return (
    <>
      <FormInput
        label="Processor"
        type="text"
        name="processor"
        value={formData.processor}
        onChange={handleChange}
      />
      <FormInput
        label="Socket"
        type="text"
        name="socket"
        value={formData.socket}
        onChange={handleChange}
      />
      <FormInput
        label="Wattage"
        type="number"
        name="wattage"
        value={formData.wattage}
        onChange={handleChange}
      />
      <FormInput
        label="Core"
        type="text"
        name="core"
        value={formData.core}
        onChange={handleChange}
      />
      <FormInput
        label="Base Frequency"
        type="text"
        name="baseFrequency"
        value={formData.baseFrequency}
        onChange={handleChange}
      />
      <FormInput
        label="Boosted Frequency"
        type="text"
        name="boostedFrequency"
        value={formData.boostedFrequency}
        onChange={handleChange}
      />
    </>
  );
};
