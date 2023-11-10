import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { PageLoader } from '@/widgets/page-loader';
import { Navbar } from '@/widgets/navbar';
import { useTheme } from './providers/lib';
import { AppRouter } from './providers/app-router';
import { getUserInited, userActions } from '@/features/user';
import { useInitialEffect, useTypedDispatch } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import './styles/index.scss';

export const App: FC = () => {
  const isInited = useSelector(getUserInited);
  const dispatch = useTypedDispatch();
  const { theme } = useTheme();

  useInitialEffect(() => {
    dispatch(userActions.initAuthData());
  });

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <Suspense fallback={<PageLoader />}>{isInited && <AppRouter />}</Suspense>
    </div>
  );
};
