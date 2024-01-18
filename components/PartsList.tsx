import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BasePart, PartType, Cpu, Gpu } from '../types';
import { Table } from '@mantine/core';

interface PartsListProps {
  partType: PartType;
}

const PartsList: React.FC<PartsListProps> = ({ partType }) => {
  const [parts, setParts] = useState<BasePart[]>([]);

  const renderPartSpecificInfo = (part: BasePart) => {
    switch (partType) {
      case 'cpu':
        if ('processor' in part) {
          const cpuPart = part as Cpu; // Cpu 型へのキャスト
          return 'processor' in part ? <td>Processor: {cpuPart.processor}</td> : null;
        }
        break;
      case 'gpu':
        if ('chip' in part) {
          const gpuPart = part as Gpu;
          return 'chip' in part ? <td>Chip: {gpuPart.chip}</td> : null;
        }
        break;
      default:
        return null;
    }
  }

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get<BasePart[]>(`/${partType}`);
        setParts(response.data);
      } catch (error) {
        console.error(`Error fetching ${partType}`, error);
      }
    };

    fetchParts();
  }, [partType]);

  const rows = parts.map((part) => (
    <tr key={part.id}>
      <td>{part.name}</td>
      <td>{part.brand}</td>
      <td>{part.categoryId}</td>
      <td>{part.price}</td>
      <td>{part.url}</td>
      {renderPartSpecificInfo(part)}
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>CategoryId</th>
          <th>Price</th>
          <th>Url</th>
          {partType === 'cpu' && (
            <>
              <th>Processor</th>
              <th>Socket</th>
              <th>Wattage</th>
              <th>Core</th>
              <th>Base Frequency</th>
              <th>Boosted Frequency</th>
            </>
          )}
          {partType === 'gpu' && <th>Chip</th>}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default PartsList;