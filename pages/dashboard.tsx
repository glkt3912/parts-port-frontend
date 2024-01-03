import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LogoutIcon } from '@heroicons/react/solid';
import { Layout } from '../components/Layout';
import { UserInfo } from '../components/UserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { TaskForm } from '../components/TaskForm';
import { PartEditForm } from '../components/PartEditForm';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    queryClient.removeQueries(['tasks']);
    queryClient.removeQueries(['user']);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/');
  };
  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
      <TaskForm />
    </Layout>
  );
};

export default Dashboard;
