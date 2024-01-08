import axios from 'axios';
import { PartsList } from '../types';

export const fetchMyParts = async (userId: number): Promise<PartsList[]> => {
    try {
      // ユーザーIDをパラメータとして追加する場合は、URLを修正する
      const response = await axios.get<PartsList[]>(`/api/partslist?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching parts:', error);
      throw error;
    }
  };