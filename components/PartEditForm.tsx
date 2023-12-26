import React, { useState, useEffect } from 'react';
import useEditPart from './../hooks/useEditPart';
import { BasePartForm } from './form/BasePartForm';
import { CpuForm } from './form/CpuForm';
import { GpuForm } from './form/GpuForm';

const PartEditForm = ({ partType, partId, onSave }) => {
    const { part, isLoading, isError } = useEditPart(partType, partId)
    const [formData, setFormData] = useState({})

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading part details.</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(part);
    };

    return (
        <form onSubmit={handleSubmit}>
            <BasePartForm formData={part} handleChange={handleChange} />
            {partType === 'cpu' && <CpuForm formData={part} handleChange={handleChange} />}
            {partType === 'gpu' && <GpuForm formData={part} handleChange={handleChange} />}
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default PartEditForm;