import React, { useState, useEffect } from 'react';
import { PartsList } from '../types';
import { fetchMyParts } from '../api/fetchMyParts';
import { useQueryUser } from '../hooks/useQueryUser';

const useParts = (userId) => {
  const [partsList, setPartsList] = useState<PartsList[]>([]);

  useEffect(() => {
    if (!userId) return;
    const loadParts = async () => {
      try {
        const fetchedParts = await fetchMyParts(userId);
        setPartsList(
          Array.isArray(fetchedParts) ? fetchedParts : [fetchedParts],
        );
      } catch (error) {
        console.error('Failed to fetch parts:', error);
      }
    };

    loadParts();
  }, [userId]);

  return partsList;
};

const formatDate = (dateString: Date) => new Date(dateString).toDateString();

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
