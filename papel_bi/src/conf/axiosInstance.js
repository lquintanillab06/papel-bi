import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 50000,
    headers: {}
  });


  export const apiUrl = {
    url: "http://localhost:8000/",
  }