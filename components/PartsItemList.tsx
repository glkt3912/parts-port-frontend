import React, { useEffect, useState } from 'react';
import {
  BasePart,
  PartType,
  Category,
  Cpu,
  Gpu,
  Power,
  MotherBoard,
  Hdd,
  Ssd,
  Memory,
  PcCase,
  Cooler,
  Display,
} from '../types';
import { Table } from '@mantine/core';
import { fetchCategories } from '../api/fetchCategories';
import {
  isCpu,
  isGpu,
  isPower,
  isMotherBoard,
  isHdd,
  isSsd,
  isMemory,
  isPcCase,
  isCooler,
  isDisplay,
} from '../types/typeGuards';
import TableHeader from './TableHeader';
import fetchPartDetails from '../api/fetchPartDetails';
import fetchMyParts from '../api/fetchMyParts';
import { getPartIdPropertyName, getPartId } from '../hooks/useParts';
import { useQueryUser } from '../hooks/useQueryUser';

interface PartsItemListProps {
  partType: PartType;
}

const PartsItemList: React.FC<PartsItemListProps> = ({ partType }) => {
  const [parts, setParts] = useState<BasePart[]>([]);
  const [categories, setCategories] = useState<Category[]>();
  const [partDetails, setPartDetails] = useState<Record<number, any>>({});
  const { data: user } = useQueryUser();

  const renderPartSpecificInfo = (part: BasePart) => {
    console.log('renderPartSpecificInfo called', part);
    const partIdPropName = getPartIdPropertyName(partType);
    console.log(partIdPropName);
    if (!partIdPropName) {
      return null;
    }

    const details = partDetails;
    console.log(details);
    if (!details) return null;

    if (!categories || categories.length === 0) return null;
    const category = categories.find(
      (category) => category.id === part.categoryId,
    );
    if (!category) return null;

    switch (category.name) {
      case 'CPU':
        if (isCpu(part)) {
          const cpuPart = details as Cpu;
          return (
            <>
              <td>{cpuPart.processor}</td>
              <td>{cpuPart.socket}</td>
              <td>{cpuPart.wattage}</td>
              <td>{cpuPart.core}</td>
              <td>{cpuPart.baseFrequency}</td>
              <td>{cpuPart.boostedFrequency}</td>
            </>
          );
        }
        break;
      case 'GPU':
        if (isGpu(part)) {
          const gpuPart = details as Gpu;
          return (
            <>
              <td>{gpuPart.chip}</td>
              <td>{gpuPart.core}</td>
              <td>{gpuPart.memory}</td>
              <td>{gpuPart.interface}</td>
              <td>{gpuPart.baseFrequency}</td>
              <td>{gpuPart.length}</td>
              <td>{gpuPart.memoryFrequency}</td>
              <td>{gpuPart.wattage}</td>
            </>
          );
        }
        break;
      case 'POWER':
        if (isPower(part)) {
          const powerPart = details as Power;
          return (
            <>
              <td>{powerPart.type}</td>
              <td>{powerPart.capacity}</td>
              <td>{powerPart.certification}</td>
            </>
          );
        }
        break;
      case 'MOTHERBOARD':
        if (isMotherBoard(part)) {
          const motherboardPart = details as MotherBoard;
          return (
            <>
              <td>{motherboardPart.chip}</td>
              <td>{motherboardPart.formFactor}</td>
              <td>{motherboardPart.memoryType}</td>
              <td>{motherboardPart.memorySlots}</td>
              <td>{motherboardPart.maxMemory}</td>
              <td>{motherboardPart.socket}</td>
              <td>{motherboardPart.pciSlots}</td>
            </>
          );
        }
        break;
      case 'HDD':
        if (isHdd(part)) {
          const hddPart = details as Hdd;
          return (
            <>
              <td>{hddPart.capacity}</td>
              <td>{hddPart.size}</td>
              <td>{hddPart.speed}</td>
              <td>{hddPart.interface}</td>
            </>
          );
        }
        break;
      case 'SSD':
        if (isSsd(part)) {
          const ssdPart = details as Ssd;
          return (
            <>
              <td>{ssdPart.capacity}</td>
              <td>{ssdPart.size}</td>
              <td>{ssdPart.speed}</td>
              <td>{ssdPart.interface}</td>
            </>
          );
        }
        break;
      case 'Memory':
        if (isMemory(part)) {
          const memoryPart = details as Memory;
          return (
            <>
              <td>{memoryPart.type}</td>
              <td>{memoryPart.frequency}</td>
              <td>{memoryPart.interface}</td>
            </>
          );
        }
        break;
      case 'PCCASE':
        if (isPcCase(part)) {
          const pccasePart = details as PcCase;
          return (
            <>
              <td>{pccasePart.formFactor}</td>
              <td>{pccasePart.weight}</td>
              <td>{pccasePart.size}</td>
            </>
          );
        }
        break;
      case 'COOLER':
        if (isCooler(part)) {
          const coolerPart = details as Cooler;
          return (
            <>
              <td>{coolerPart.supportedTdp}</td>
              <td>{coolerPart.coolingType}</td>
              <td>{coolerPart.fanCount}</td>
              <td>{coolerPart.airFlow}</td>
              <td>{coolerPart.size}</td>
              <td>{coolerPart.socket}</td>
            </>
          );
        }
        break;
      case 'DISPLAY':
        if (isDisplay(part)) {
          const displayPart = details as Display;
          return (
            <>
              <td>{displayPart.size}</td>
              <td>{displayPart.type}</td>
              <td>{displayPart.speed}</td>
              <td>{displayPart.resolution}</td>
              <td>{displayPart.contrast ?? ''}</td>
            </>
          );
        }
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchParts = async () => {
      try {
        const partIdPropName = getPartIdPropertyName(partType);
        if (!partIdPropName) {
          console.error(`Invalid part type: ${partType}`);
          return;
        }
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse);

        const category = categoriesResponse.find(
          (cat) => cat.name.toLowerCase() === partType,
        );
        if (!category) {
          console.error(`Category not found for partType: ${partType}`);
          return;
        }
        const partslistResponse = await fetchMyParts(user.id);
        const partId = getPartId(partslistResponse, partType);
        if (partId) {
          const details = await fetchPartDetails(partType, partId);
          const basePart = {
            id: details.id,
            name: details.name,
            brand: details?.brand,
            image: details?.image,
            url: details?.url,
            price: details?.price,
            categoryId: details.categoryId,
          };
          setParts([basePart]);
          console.log(details);
          setPartDetails(details);
        }
      } catch (error) {
        console.error(`Error fetching ${partType}`, error);
        if (error) {
          console.error(`Error fetching parts list for ${partType}`, error);
        }
      }
    };

    fetchParts();
  }, [partType, user?.id]);

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
      <TableHeader partType={partType} />
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default PartsItemList;
