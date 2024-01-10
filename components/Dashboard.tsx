import React from 'react';
import { MyPartsList } from './MyPartsList';

const Dashboard = () => {
  const userId = ''/* ユーザーIDを取得するロジック */;

  return (
    <div>
      <h1>Dashboard</h1>
      <MyPartsList userId={userId} />
    </div>
  );
};