import React, { useState, useEffect } from 'react';
import useEditPart from './../hooks/useEditPart';
import { BasePartForm } from './form/BasePartForm';
import { CpuForm } from './form/CpuForm';
import { GpuForm } from './form/GpuForm';
import { fetchCategories } from './../api/fetchCategories';

type PartEditFormProps = {
    partType: 'cpu' | 'gpu';
    partId: string;
    onSave: (part: any) => void;
  };

export const PartEditForm = ({ partType, partId, onSave }: PartEditFormProps) => {
    const { part, isLoading, isError, errorMessage } = useEditPart(partType, partId);
    const [formData, setFormData] = useState({});
    const [categories, setCategories] = useState([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            setIsCategoriesLoading(true);
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Error loading categories:', error);
                setCategoriesError((error as Error).message);
            }
            setIsCategoriesLoading(false);
        };

        loadCategories();
    }, []);

    if (isLoading || isCategoriesLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading part details: {errorMessage}</p>;
    if (categoriesError) return <p>Error loading categories: {categoriesError}</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <BasePartForm formData={part} handleChange={handleChange} categories={categories} />
            {partType === 'cpu' && <CpuForm formData={part} handleChange={handleChange} />}
            {partType === 'gpu' && <GpuForm formData={part} handleChange={handleChange} />}
            <button type="submit">Save Changes</button>
        </form>
    );
};