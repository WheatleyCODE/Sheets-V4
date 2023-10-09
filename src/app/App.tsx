import { FC, Suspense, useCallback, useEffect } from 'react';
import { PageLoader } from 'widgets/page-loader';
import { useSelector } from 'react-redux';
import { Navbar } from 'widgets/navbar';
import { useTheme } from './providers/lib/theme-context';
import { AppRouter } from './providers/app-router';
import { IUser, getUserInited, userActions } from 'entities/user';
import { useTypedDispatch } from 'shared/lib/hooks';
import { KVFactory } from 'shared/lib/kv-storage';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts';
import { classNames } from 'shared/lib/class-names';
import './styles/index.scss';

export const App: FC = () => {
  const isInited = useSelector(getUserInited);
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
      <Navbar />
      {/* ! FIX */}
      <Suspense fallback={<PageLoader />}>{isInited && <AppRouter />}</Suspense>
    </div>
  );
};
