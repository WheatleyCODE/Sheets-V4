import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from '@/shared/consts';
import { KVFactory } from '@/shared/lib/kv-storage';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers) => {
      // * Sync
      ls.get(LS_AUTH_KEY).then((value) => headers.set('Authorization', JSON.stringify(value)));
      return headers;
    },
  }),
  endpoints: () => ({}),
});
