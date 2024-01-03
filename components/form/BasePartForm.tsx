import React, { useState, useEffect } from 'react';
import { FormInput, FormSelect } from './FormComponent';
import { BasePart, Category } from './../../types';

type BasePartFormProps = {
  formData: BasePart;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  categories: Category[];
};

export const BasePartForm = ({ formData, handleChange }: BasePartFormProps) => {
  return (
    <>
      <FormInput
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <FormInput
        label="Brand"
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
      />
      <FormInput
        label="Image"
        type="text"
        name="image"
        value={formData.image || ''}
        onChange={handleChange}
      />
      <FormInput
        label="URL"
        type="text"
        name="url"
        value={formData.url || ''}
        onChange={handleChange}
      />
      <FormInput
        label="Price"
        type="text"
        name="price"
        value={formData.price || ''}
        onChange={handleChange}
      />
      <FormSelect
        label="Category"
        name="categoryId"
        value={formData.categoryId || ''}
        onChange={handleChange}
        options={categories}
      />
    </>
  );
};
