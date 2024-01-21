import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { UserInfo } from '../components/UserInfo';
import { CategoryList } from '../components/CategoryList';
import { MyPartsList } from '../components/MyPartsList';
import { PartType, partTypes } from '../types';
import PartsItemList from '../components/PartsItemList';
import { Container } from '@mantine/core';

const Dashboard: NextPage = () => {
  const [partType, setPartType] = useState<PartType>('cpu');
  const [partId, setPartId] = useState<string>('');

  return (
      <Layout>
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
        <Container>
          <MyPartsList />
        </Container>
        <Container>
          <PartsItemList partType={partType} />
        </Container>
      </Layout>
  );
};

export default Dashboard;
