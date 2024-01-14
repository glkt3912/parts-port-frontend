import create from 'zustand';
import { PartType } from '../types/index';

// storeの状態を定義
type State = {
  editedPart: PartType | null; // 編集中のパーツ（任意のパーツタイプ）
  updateEditedPart: (part: PartType) => void; // 編集中のパーツを更新する関数
  resetEditedPart: () => void; // 編集中のパーツをリセットする関数
  // ユーザー情報の状態を追加
  user: {
    id: number | null;
    name: string | null;
  };
};

const useStore = create<State>((set) => ({
  editedPart: null, // 初期状態では編集中のパーツはなし

  user: {
    id: null,
    name: null,
  },

  // 編集中のパーツを更新する関数
  updateEditedPart: (part) =>
    set({
      editedPart: part,
    }),
  // 編集中のパーツをリセットする関数
  resetEditedPart: () => set({ editedPart: null }),
}));

export default useStore;
