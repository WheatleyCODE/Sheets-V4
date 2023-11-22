import { Reducer } from '@reduxjs/toolkit';
import { IReduxStoreWithManager } from '@/app/providers/store-provider';
import { StateSchemaKey } from '@/app/providers/store-provider';
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useTypedDispatch } from '../use-typed-dispatch/useTypedDispatch';
import type { ReducersList } from './useDynamicModule.interface';

export const useDynamicModule = (list: ReducersList, isDestroy = true) => {
  const dispatch = useTypedDispatch();
  const store = useStore() as IReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    const entries = Object.entries(list) as [StateSchemaKey, Reducer][];

    for (const [key, reducer] of entries) {
      if (mountedReducers[key]) continue;

      store.reducerManager.add(key, reducer);
      dispatch({ type: `@INIT ${key} reducer` });
    }

    return () => {
      if (!isDestroy) return;

      const keys = Object.keys(list) as StateSchemaKey[];

      for (const key of keys) {
        store.reducerManager.remove(key);
        dispatch({ type: `@DESTROY ${key} reducer` });
      }
    };
  }, []);
};
