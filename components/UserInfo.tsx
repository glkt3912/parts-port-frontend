import { useQueryUser } from '../hooks/useQueryUser';
import { Loader } from '@mantine/core';

export const UserInfo = () => {
  const { data: user, status } = useQueryUser();
  if (status === 'loading') {
    return <Loader />;
  } else if (status === 'error') {
    return <div className="align-center">データの読み込みに失敗しました</div>;
  }
  return <p>{user?.email}</p>;
};
