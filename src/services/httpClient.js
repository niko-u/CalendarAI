import axios from 'axios';
import { baseURL, prodURL } from '../constants/urls';

// Determine if it is in development mode
const isDev = process.env.REACT_APP_ENVIRONMENT === 'development';

// Create the Axios instance
export const httpClient = axios.create({
  baseURL: isDev ? baseURL : prodURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  },
});