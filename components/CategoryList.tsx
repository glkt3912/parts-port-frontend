import React from 'react';
import { PartType } from '../types';

export const CategoryList = ({ partType }: { partType: PartType }) => {
  // カテゴリに応じたパーツ一覧を取得・表示するロジック
  return <div>カテゴリ {partType} のパーツ一覧</div>;
};