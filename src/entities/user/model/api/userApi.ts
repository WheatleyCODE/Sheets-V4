import { rtkApi } from '@/shared/api';
import { IUser } from '../types/user.interface';

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserDataById: build.query<IUser, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const fetchUserById = userApi.endpoints.getUserDataById.initiate;
