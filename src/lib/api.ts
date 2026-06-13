import axios from 'axios';
import { JSON_HEADER } from './constance';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: JSON_HEADER,
});

export default api;