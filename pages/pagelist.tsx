import React from 'react';
import { Container, Title, Stack, Button } from '@mantine/core';
import Link from 'next/link';
import Layout from '../components/Layout';

const PageList = () => {
  return (
    <Layout>
      <Container>
        <Title order={1}>ページリスト</Title>
        <Stack spacing="md">
          {/* 各ページへのリンク */}
          <Link href="/dashboard" passHref>
            <Button component="a">ダッシュボード</Button>
          </Link>
          <Link href="/myparts" passHref>
            <Button component="a">マイパーツリスト</Button>
          </Link>
          <Link href="/settings" passHref>
            <Button component="a">設定</Button>
          </Link>
          {/* 他のページへのリンクを追加 */}
        </Stack>
        {/* <PartsItemList /> */}
        </Container>
    </Layout>
  );
};

export default PageList;
