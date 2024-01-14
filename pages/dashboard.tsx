import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LogoutIcon } from '@heroicons/react/solid';
import { Layout } from '../components/Layout';
import { UserInfo } from '../components/UserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { PartEditForm } from '../components/PartEditForm';
import { CategoryList } from '../components/CategoryList';
import { MyPartsList } from '../components/MyPartsList';
import { User } from '../types';
import { useQueryUser } from '../hooks/useQueryUser';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [partType, setPartType] = useState<'cpu' | 'gpu'>('cpu');
  const [partId, setPartId] = useState<string>('');
  const { data: user } = useQueryUser();

  const logout = async () => {
    queryClient.removeQueries(['tasks']);
    queryClient.removeQueries(['user']);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/');
  };
  return (
    <Layout title="Task Board">
      <MyPartsList userId={user?.id} />
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <CategoryList partType={partType} />
      <UserInfo />

      {/* パーツタイプ選択 */}
      <select value={partType} onChange={(e) => setPartType(e.target.value)}>
        <option value="">Select Part Type</option>
        <option value="cpu">CPU</option>
        <option value="gpu">GPU</option>
      </select>

      {/* パーツID入力 */}
      <input
        type="text"
        placeholder="Enter Part ID"
        value={partId}
        onChange={(e) => setPartId(e.target.value)}
      />

      {/* PartEditForm のレンダリング */}
      {partType && partId && (
        <PartEditForm partType={partType} partId={partId} onSave={handleSave} />
      )}
    </Layout>
  );
};

export default Dashboard;
