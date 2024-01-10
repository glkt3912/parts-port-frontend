import React, { useState, useEffect } from 'react';
import { PartsList } from '../types';
import { fetchMyParts } from '../api/fetchMyParts';

type MyPartsListProps = {
  userId: number;
};

export const MyPartsList: React.FC<MyPartsListProps> = ({ userId }) => {
  const [parts, setParts] = useState<PartsList[]>([]);

  useEffect(() => {
    const loadParts = async () => {
      try {
        const fetchedParts = await fetchMyParts(userId);
        setParts(fetchedParts);
      } catch (error) {
        console.error('Failed to fetch parts:', error);
      }
    };

    loadParts();
  }, [userId]);

  return (
    <div>
      <h2>My Parts List</h2>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>
            <div>Name: {part.name}</div>
            <div>Description: {part.description}</div>
            {/* 他のパーツの詳細情報を表示 */}
          </li>
        ))}
      </ul>
    </div>
  );
};