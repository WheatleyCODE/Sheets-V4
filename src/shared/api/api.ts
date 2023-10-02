import axios from 'axios';

export const api = axios.create({
  baseURL: __API__,
  headers: {
    // ! FIX KVStorage
    authorization: localStorage.getItem('[[SheetsV4-ls_auth-key]]'),
  },
});
