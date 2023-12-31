import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useStore from '../store';
import fetchPartDetails from '../api/fetchPartDetails';
import { PartType } from '../types';

const useEditPart = (partType: PartType, partId: string | number) => {
  const queryKey = ['part', partType, partId];
  const queryFn = () =>
    fetchPartDetails(partType as PartType, parseInt(partId as string));
  const {
    data: part,
    isLoading,
    isError,
    error,
  } = useQuery(queryKey, queryFn, {
    enabled: !!partType && !!partId,
  });
  const { updateEditedPart } = useStore();

  useEffect(() => {
    if (part) {
      updateEditedPart(part);
    }
  }, [part, updateEditedPart]);

  return { part, isLoading, isError, errorMessage: (error as Error)?.message };
};

export default useEditPart;
