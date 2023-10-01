import { Reducer } from '@reduxjs/toolkit';
import { IReduxStoreWithManager } from 'app/providers/store-provider';
import { StateSchemaKey } from 'app/providers/store-provider/config/stateSchema';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export interface IReducerList extends Record<StateSchemaKey | undefined, Reducer> {}

export const useDynamicModule = (list: IReducerList, isDestroy = true) => {
  const dispatch = useDispatch();
  const store = useStore() as IReduxStoreWithManager;

  useEffect(() => {
    const entries = Object.entries(list) as [StateSchemaKey, Reducer][];

    for (const [key, reducer] of entries) {
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
