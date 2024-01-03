export type AuthForm = {
  identifier: string;
  password: string;
};
export type EditedTask = {
  id: number;
  title: string;
  description?: string | null;
};

export type Category = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
};

export type PartsList = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  userId: number;
  cpuId?: number;
  motherboardId?: number;
  memoryId?: number;
  hddId?: number;
  ssdId?: number;
  powerId?: number;
  pccaseId?: number;
  displayId?: number;
  isOpened: boolean;
  gpuId?: number;
  description: string;
  coolerId?: number;
};

export type BasePart = {
  id: number;
  name: string;
  brand: string;
  image?: string;
  url?: string;
  price?: string;
  categoryId: number;
};

export type Cpu = BasePart & {
  processor: string;
  socket: string;
  wattage: number;
  core: string;
  baseFrequency: string;
  boostedFrequency: string;
};

export type Gpu = BasePart & {
  chip: string;
  core: string;
  memory: string;
  interface: string;
  baseFrequency: string;
  length: string;
  memoryFrequency: string;
  wattage: number;
};

export type Power = BasePart & {
  type: string;
  capacity: string;
  certification: string;
};

export type MotherBoard = BasePart & {
  chip: string;
  formFactor: string;
  memoryType: string;
  memorySlots: number;
  maxMemory: number;
  socket: string;
  pciSlots: string;
};

export type Hdd = BasePart & {
  capacity: string;
  size: string;
  speed: string;
  interface: string;
};

export type Ssd = BasePart & {
  capacity: string;
  size: string;
  speed: string;
  interface: string;
};

export type Memory = BasePart & {
  type: string;
  frequency: string;
  interface: string;
};

export type PcCase = BasePart & {
  formFactor: string;
  weight: string;
  size: string;
};

export type Cooler = BasePart & {
  supportedTdp: number;
  coolingType: string;
  fanCount: number;
  airFlow: string;
  size: string;
  socket: string;
};

export type Display = BasePart & {
  size: string;
  type: string;
  speed: string;
  resolution: string;
  contrast?: string;
};
