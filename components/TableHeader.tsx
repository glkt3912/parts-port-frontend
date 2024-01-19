import React from 'react';
import { PartType } from '../types';

const partTypeHeaders = {
  cpu: [
    'Processor',
    'Socket',
    'Wattage',
    'Core',
    'Base Frequency',
    'Boosted Frequency',
  ],
  gpu: [
    'Chip',
    'Core',
    'Memory',
    'Interface',
    'Base Frequency',
    'Length',
    'Memory Frequency',
    'Wattage',
  ],
  motherboard: [
    'Socket',
    'Form Factor',
    'Memory Type',
    'Memory Slots',
    'Max Memory',
    'PCI Slots',
  ],
  memory: ['Type', 'Frequency', 'Interface'],
  hdd: ['Capacity', 'Size', 'Speed', 'Interface'],
  ssd: ['Capacity', 'Size', 'Speed', 'Interface'],
  power: ['Type', 'Capacity', 'Certification'],
  pccase: ['Form Factor', 'Weight', 'Size'],
  cooler: [
    'Supported TDP',
    'Cooling Type',
    'Fan Count',
    'Air Flow',
    'Size',
    'Socket',
  ],
  display: ['Size', 'Type', 'Speed', 'Resolution', 'Contrast'],
};

interface TableHeaderProps {
  partType: PartType;
}

const TableHeader: React.FC<TableHeaderProps> = ({ partType }) => {
  const headers = [
    'Name',
    'Brand',
    'CategoryId',
    'Price',
    'Url',
    ...(partTypeHeaders[partType] || []),
  ];

  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
