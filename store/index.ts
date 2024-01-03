import create from 'zustand/react';
import {
  Cpu,
  Gpu,
  MotherBoard,
  Memory,
  Hdd,
  Ssd,
  Power,
  PcCase,
  Cooler,
  Display,
} from '../types/index';

type PartType =
  | Cpu
  | Gpu
  | MotherBoard
  | Memory
  | Hdd
  | Ssd
  | Power
  | PcCase
  | Cooler
  | Display;
// storeの状態を定義
type State = {
  editedPart: PartType | null; // 編集中のパーツ（任意のパーツタイプ）
  updateEditedPart: (part: PartType) => void; // 編集中のパーツを更新する関数
  resetEditedPart: () => void; // 編集中のパーツをリセットする関数
};

const useStore = create<State>((set) => ({
  editedPart: null, // 初期状態では編集中のパーツはなし

  // 編集中のパーツを更新する関数
  updateEditedPart: (part) =>
    set({
      editedPart: part,
    }),
  // 編集中のパーツをリセットする関数
  resetEditedPart: () => set({ editedPart: null }),
}));

export default useStore;
