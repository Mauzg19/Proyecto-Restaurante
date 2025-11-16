import axios from 'axios';

export const API_URL = "https://backend-spring-boot-production-bea1.up.railway.app";


export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});


