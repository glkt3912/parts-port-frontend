import React from 'react';
import { PartsList } from '../types';

type MyPartsListProps = {
  parts: PartsList[];
};

export const MyPartsList: React.FC<MyPartsListProps> = ({ parts }) => {
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