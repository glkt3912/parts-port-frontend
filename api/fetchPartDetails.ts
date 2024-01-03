import axios from 'axios';

type PartType =
  | 'cpu'
  | 'gpu'
  | 'motherboard'
  | 'memory'
  | 'hdd'
  | 'ssd'
  | 'power'
  | 'pccase'
  | 'cooler'
  | 'display';

const fetchPartDetails = async (partType: PartType, partId: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables');
  }
  try {
    const response = await axios.get(`${apiUrl}/${partType}/${partId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${partType} details:`, error);
    throw error;
  }
};

export default fetchPartDetails;
