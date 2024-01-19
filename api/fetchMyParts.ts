import axios from 'axios';
import { PartsList } from '../types';

const fetchMyParts = async (userId: number): Promise<PartsList[]> => {
  try {
    // ユーザーIDをパラメータとして追加する場合は、URLを修正する
    const response = await axios.get<PartsList[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/partslist/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching parts:', error);
    throw error;
  }
};

export default fetchMyParts;
