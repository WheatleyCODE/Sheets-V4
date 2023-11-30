import { FC, Suspense } from 'react';
import { PageLoader } from '@/widgets/page-loader';
import { Navbar } from '@/widgets/navbar';
import { useFetchUser, useUserActions } from '@/entities/user';
import { AppRouter } from './providers/app-router';
import { KVFactory } from '@/shared/lib/kv-storage';
import { LS_AUTH_KEY } from '@/shared/consts';
import { Loader } from '@/shared/ui/loaders';
import { useUserInited, useUserIsLoading } from '@/entities/user';
import { useInitialEffect, useTheme } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import './styles/index.scss';

const ls = KVFactory();

export const App: FC = () => {
  const isInited = useUserInited();
  const isLoading = useUserIsLoading();
  const fetchUser = useFetchUser();
  const { initAuthData } = useUserActions();
  const { theme } = useTheme();

  useInitialEffect(() => {
    // * Sync
    ls.get<string>(LS_AUTH_KEY).then((id) => {
      if (id) {
        fetchUser(id);
      } else {
        initAuthData();
      }
    });
  });

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        {isLoading && <Loader isCenter />}
        {isInited && <AppRouter />}
      </Suspense>
    </div>
  );
};
