import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { PartsList } from '../types';


export const useMutatePart = () => {
  const queryClient = useQueryClient();
  const createPart = useMutation((partData: PartsList) => axios.post('/partslist', partData), {
    onSuccess: () => {
      queryClient.invalidateQueries(['partslist']);
    },
  });
  const updatePart = useMutation(
    (partData: PartsList) => axios.put(`/partslist/${partData.userId}`, partData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['partslist']);
      },
    },
  );
  return { createPart, updatePart };
};
