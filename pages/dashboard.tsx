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
import { PartType, partTypes } from '../types';
import { useQueryUser } from '../hooks/useQueryUser';
import PartsItemList from '../components/PartsItemList';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [partType, setPartType] = useState<PartType>('cpu');
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
      {/* <MyPartsList userId={user?.id} /> */}
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <CategoryList partType={partType} />
      <UserInfo />

      {/* パーツタイプ選択 */}
      <select
        value={partType}
        onChange={(e) => {
          const newValue = e.target.value;
          if (partTypes.includes(newValue as PartType)) {
            setPartType(newValue as PartType);
          }
        }}
      >
        <option value="">Select Part Type</option>
        {partTypes.map((type) => (
          <option key={type} value={type}>
            {type.toUpperCase()}
          </option>
        ))}
      </select>

      {/* パーツID入力 */}
      <input
        type="text"
        placeholder="Enter Part ID"
        value={partId}
        onChange={(e) => setPartId(e.target.value)}
      />

      <PartsItemList partType={partType} />
    </Layout>
  );
};

export default Dashboard;
