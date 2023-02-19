import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.NEXT_PUBLIC_CAT_API_KEY;

export const fetchNextCat = async () => {
  const response = await axios.get(`/images/search?limit=1`);
  return response.data[0];
}

export const createUpVote = async (id) => {
  const response = await axios.post(
    `/votes`,
    {
      image_id: id,
      value: 1,
    },
  );
  return response.data;
};

export const createDownVote = async (id) => {
  const response = await axios.post(
    `/votes`,
    {
      image_id: id,
      value: -1,
    },
  );
  return response.data;
};
