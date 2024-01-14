import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '@prisma/client';

type UserData = Omit<User, 'hashedPassword' | 'createdAt' | 'updatedAt'>;

export const useQueryUser = () => {
  const router = useRouter();
  const getUser = async () => {
    const { data } = await axios.get<UserData>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
    );
    return data;
  };
  return useQuery<UserData, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/');
    },
  });
};
