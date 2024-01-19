import { useState, useEffect } from 'react';
import { PartsList, PartType } from '../types';
import { fetchMyParts } from '../api/fetchMyParts';

export const useParts = (userId: number) => {
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

export const formatDate = (dateString: Date) =>
  new Date(dateString).toDateString();

export const getPartIdPropertyName = (partType: PartType) => {
  switch (partType) {
    case 'cpu':
      return 'cpuId';
    case 'gpu':
      return 'gpuId';
    case 'power':
      return 'powerId';
    case 'motherboard':
      return 'motherboardId';
    case 'memory':
      return 'memoryId';
    case 'hdd':
      return 'hddId';
    case 'ssd':
      return 'ssdId';
    case 'pccase':
      return 'pccaseId';
    case 'cooler':
      return 'coolerId';
    case 'display':
      return 'displayId';
    default:
      return null;
  }
};

export const getPartId = (
  partsListObject: any,
  partType: PartType,
): number | null => {
  const propertyName = getPartIdPropertyName(partType);
  return propertyName ? partsListObject[propertyName] : null;
};
