import axios from 'axios';
import { PartsList } from '../types';

export const fetchMyParts = async (userId: number): Promise<PartsList[]> => {
  try {
    // ユーザーIDをパラメータとして追加する場合は、URLを修正する
    const response = await axios.get<PartsList[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/partslist/${userId}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching parts:', error);
    throw error;
  }
};
