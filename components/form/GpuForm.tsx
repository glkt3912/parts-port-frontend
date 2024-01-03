import React from 'react';
import { FormInput } from './FormComponent';
import { Gpu } from './../../types';

type GpuFormProps = {
  formData: Gpu;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const GpuForm = ({ formData, handleChange }: GpuFormProps) => {
  return (
    <>
      <FormInput
        label="Chip"
        type="text"
        name="chip"
        value={formData.chip}
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
        label="Memory"
        type="text"
        name="memory"
        value={formData.memory}
        onChange={handleChange}
      />
      <FormInput
        label="Interface"
        type="text"
        name="interface"
        value={formData.interface}
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
        label="Length"
        type="text"
        name="length"
        value={formData.length}
        onChange={handleChange}
      />
      <FormInput
        label="Memory Frequency"
        type="text"
        name="memoryFrequency"
        value={formData.memoryFrequency}
        onChange={handleChange}
      />
      <FormInput
        label="Wattage"
        type="number"
        name="wattage"
        value={formData.wattage || 0}
        onChange={handleChange}
      />
    </>
  );
};
