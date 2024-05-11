import axios from 'axios';

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAll = async () => {
  const request = axios.get(`${baseURL}all`);
  const response = await request;
  return response.data;
};

const getByName = async (name) => {
  const request = axios.get(`${baseURL}name/${name}`);
  const response = await request;
  return response.data;
};

export default { getAll, getByName };
