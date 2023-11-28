import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { PageLoader } from '@/widgets/page-loader';
import { Navbar } from '@/widgets/navbar';
import { AppRouter } from './providers/app-router';
import { KVFactory } from '@/shared/lib/kv-storage';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from '@/shared/consts';
import { Loader } from '@/shared/ui/loaders';
import { getUserInited, fetchUser, getUserIsLoading } from '@/entities/user';
import { useInitialEffect, useTheme, useTypedDispatch } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import './styles/index.scss';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const App: FC = () => {
  const isInited = useSelector(getUserInited);
  const isLoading = useSelector(getUserIsLoading);
  const dispatch = useTypedDispatch();
  const { theme } = useTheme();

  useInitialEffect(() => {
    // * Sync
    ls.get<string>(LS_AUTH_KEY).then((id) => {
      if (id) dispatch(fetchUser(id));
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
