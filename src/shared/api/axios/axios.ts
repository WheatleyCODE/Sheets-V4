import axios from 'axios';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from '@/shared/consts';
import { KVFactory } from '@/shared/lib/kv-storage/kv-storage/kvStorage';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    // * Sync
    ls.get(LS_AUTH_KEY).then((value) => (config.headers.Authorization = JSON.stringify(value)));
  }

  return config;
});
