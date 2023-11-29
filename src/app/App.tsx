import { FC, Suspense } from 'react';
import { PageLoader } from '@/widgets/page-loader';
import { Navbar } from '@/widgets/navbar';
import { AppRouter } from './providers/app-router';
import { KVFactory } from '@/shared/lib/kv-storage';
import { LS_AUTH_KEY } from '@/shared/consts';
import { Loader } from '@/shared/ui/loaders';
import { useUserInited, fetchUser, useUserIsLoading, userActions } from '@/entities/user';
import { useInitialEffect, useTheme, useTypedDispatch } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import './styles/index.scss';

const ls = KVFactory();

export const App: FC = () => {
  const isInited = useUserInited();
  const isLoading = useUserIsLoading();
  const dispatch = useTypedDispatch();
  const { theme } = useTheme();

  useInitialEffect(() => {
    // * Sync
    ls.get<string>(LS_AUTH_KEY).then((id) => {
      if (id) {
        dispatch(fetchUser(id));
      } else {
        dispatch(userActions.initAuthData());
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
