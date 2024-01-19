import {
  BasePart,
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
} from '.';

export function isCpu(part: BasePart): part is Cpu {
  return (
    'processor' in part &&
    'socket' in part &&
    'wattage' in part &&
    'core' in part &&
    'baseFrequency' in part &&
    'boostedFrequency' in part
  );
}

export function isGpu(part: BasePart): part is Gpu {
  return (
    'chip' in part &&
    'memory' in part &&
    'interface' in part &&
    'baseFrequency' in part &&
    'length' in part &&
    'memoryFrequency' in part &&
    'wattage' in part
  );
}

export function isPower(part: BasePart): part is Power {
  return 'type' in part && 'capacity' in part && 'certification' in part;
}

export function isMotherBoard(part: BasePart): part is MotherBoard {
  return (
    'chip' in part &&
    'formFactor' in part &&
    'memoryType' in part &&
    'memorySlots' in part &&
    'maxMemory' in part &&
    'socket' in part &&
    'pciSlots' in part
  );
}

export function isHdd(part: BasePart): part is Hdd {
  return (
    'capacity' in part &&
    'size' in part &&
    'speed' in part &&
    'interface' in part
  );
}

export function isSsd(part: BasePart): part is Ssd {
  return (
    'capacity' in part &&
    'size' in part &&
    'speed' in part &&
    'interface' in part
  );
}

export function isMemory(part: BasePart): part is Memory {
  return 'type' in part && 'frequency' in part && 'interface' in part;
}

export function isPcCase(part: BasePart): part is PcCase {
  return 'formFactor' in part && 'weight' in part && 'size' in part;
}

export function isCooler(part: BasePart): part is Cooler {
  return (
    'supportedTdp' in part &&
    'coolingType' in part &&
    'fanCount' in part &&
    'airFlow' in part &&
    'size' in part &&
    'socket' in part
  );
}

export function isDisplay(part: BasePart): part is Display {
  return (
    'size' in part && 'type' in part && 'speed' in part && 'resolution' in part
  );
}
