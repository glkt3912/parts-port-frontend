import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { UserInfo } from '../components/UserInfo';
import { CategoryList } from '../components/CategoryList';
import { MyPartsList } from '../components/MyPartsList';
import { PartType, partTypes } from '../types';
import PartsItemList from '../components/PartsItemList';
import { Container, AppShell, Navbar, Text, useMantineTheme } from '@mantine/core';
import { CustomHeader } from '../components/CustomHeader';

const Dashboard: NextPage = () => {
  const [partType, setPartType] = useState<PartType>('cpu');
  const [partId, setPartId] = useState<string>('');
  // AppShellのためのステート
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          {/* ナビゲーションバーの内容 */}
          <Text>Navbar content</Text>
        </Navbar>
      }
      header={
       <CustomHeader opened={opened} setOpened={setOpened} theme={theme}/>
      }
    >
      <Layout title="Task Board">
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
    </AppShell>
  );
};

export default Dashboard;
