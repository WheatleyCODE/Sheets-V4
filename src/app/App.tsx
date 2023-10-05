import { FC, Suspense, useCallback, useEffect } from 'react';
import { Navbar } from 'widgets/navbar';
import { PageLoader } from 'widgets/page-loader/ui/PageLoader';
import { useTheme } from './providers/lib/theme-context';
import { AppRouter } from './providers/app-router';
import { IUser, userActions } from 'entities/user';
import { useTypedDispatch } from 'shared/lib/hooks';
import { KVFactory } from 'shared/lib/kv-storage';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts';
import { classNames } from 'shared/lib/class-names';
import './styles/index.scss';

export const App: FC = () => {
  const dispatch = useTypedDispatch();
  const { theme } = useTheme();

  const initAuth = useCallback(async () => {
    const ls = KVFactory(LS_DEFAULT_NAMESPACE);
    const user = await ls.get<IUser>(LS_AUTH_KEY);
    if (user) dispatch(userActions.setUser(user));
  }, [dispatch]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  );
};
