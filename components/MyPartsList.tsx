import React from 'react';
import { useQueryUser } from '../hooks/useQueryUser';
import { useParts, formatDate } from '../hooks/useParts';

export const MyPartsList = () => {
  const { data: user, isLoading, isError } = useQueryUser();
  const partsList = useParts(user?.id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Parts List</h2>
      <ul>
        {partsList.map((part) => (
          <ul key={part.id}>
            <li>Name: {part.name}</li>
            <li>Owner: {part.userId}</li>
            <li>Description: {part.description}</li>
            <li>CreatedAt: {formatDate(part.createdAt)}</li>
            <li>UpdatedAt: {formatDate(part.updatedAt)}</li>
            <li>Cpu: {part?.cpuId}</li>
            <li>MotherBoard: {part?.motherboardId}</li>
            <li>Memory: {part?.memoryId}</li>
            <li>Hdd: {part?.hddId}</li>
            <li>Ssd: {part?.ssdId}</li>
            <li>Gpu: {part?.gpuId}</li>
            <li>Power: {part?.powerId}</li>
            <li>PcCase: {part?.pccaseId}</li>
            <li>Cooler: {part?.coolerId}</li>
            <li>Display: {part?.displayId}</li>
          </ul>
        ))}
      </ul>
    </div>
  );
};
