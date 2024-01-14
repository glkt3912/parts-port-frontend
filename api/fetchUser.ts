import axios from 'axios';

const fetchUser = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables');
  }
  try {
    const response = await axios.get(`${apiUrl}/user`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching User details:`, error);
    throw error;
  }
};

export default fetchUser;
