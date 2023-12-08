import { FC, Suspense, useEffect } from 'react';
import { PageLoader } from '@/widgets/page-loader';
import { useFetchUser, useUserActions } from '@/entities/user';
import { AppRouter } from './providers/app-router';
import { Layout } from './layout';
import { KVFactory } from '@/shared/lib/kv-storage';
import { LS_AUTH_KEY } from '@/shared/consts';
import { useUserInited, useUserIsLoading } from '@/entities/user';
import { useInitialEffect, useTheme } from '@/shared/lib/hooks';
import './styles/index.scss';

// * Sync
const ls = KVFactory();

export const App: FC = () => {
  const isInited = useUserInited();
  const isLoading = useUserIsLoading();
  const fetchUser = useFetchUser();
  const { initAuthData } = useUserActions();
  const { theme } = useTheme();

  useInitialEffect(() => {
    ls.get<string>(LS_AUTH_KEY).then((id) => {
      if (id) {
        fetchUser(id);
      } else {
        initAuthData();
      }
    });
  });

  useEffect(() => {
    document.body.classList.remove(...document.body.classList);
    document.body.classList.add('app');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          {isLoading && <PageLoader />}
          {isInited && <AppRouter />}
        </Suspense>
      </Layout>
    </div>
  );
};
