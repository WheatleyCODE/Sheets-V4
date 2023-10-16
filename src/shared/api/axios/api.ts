import axios from 'axios';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts';
import { KVFactory } from 'shared/lib/kv-storage';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

const headers = {
  authorization: '',
};

// * Sync
ls.get(LS_AUTH_KEY).then((value) => (headers.authorization = JSON.stringify(value)));

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers,
});
