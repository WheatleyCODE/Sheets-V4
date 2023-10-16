import { FC, Suspense } from 'react';
import { PageLoader } from 'widgets/page-loader';
import { useSelector } from 'react-redux';
import { Navbar } from 'widgets/navbar';
import { useTheme } from './providers/lib/theme-context';
import { AppRouter } from './providers/app-router';
import { getUserInited, userActions } from 'entities/user';
import { useInitialEffect, useTypedDispatch } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
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
