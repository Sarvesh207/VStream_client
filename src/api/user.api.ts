import axios from 'axios';
import { API_BASE_URL } from '../config';

const client = axios.create({
    baseURL: API_BASE_URL,
});

export const loginUser = async (data) => {
  const res = await client.post('/users/login', data);
  return res.data;
};  

export const registerUser = async (data) => {
  const res = await client.post('/users/register', data);
  return res.data;
};
