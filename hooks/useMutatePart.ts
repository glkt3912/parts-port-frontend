import { useRouter } from 'next/router'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export const useMutatePart = () => {
    const queryClient = useQueryClient();
    const createPart = useMutation(partData => axios.post('/parts', partData), {
      onSuccess: () => {
        queryClient.invalidateQueries(['parts']);
      },
    });
    const updatePart = useMutation(partData => axios.put(`/parts/${partData.id}`, partData), {
      onSuccess: () => {
        queryClient.invalidateQueries(['parts']);
      },
    });
    return { createPart, updatePart };
  };