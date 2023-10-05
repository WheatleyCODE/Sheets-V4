import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    // ! FIX KVStorage
    authorization: localStorage.getItem('[[SheetsV4-ls_auth-key]]'),
  },
});
