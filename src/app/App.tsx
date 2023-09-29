import { FC, Suspense } from 'react';
import { useTheme, AppRouter } from './providers';
import { Navbar } from 'widgets/navbar';
import { PageLoader } from 'widgets/page-loader/ui/PageLoader';
import { classNames } from 'shared/lib/class-names';
import './styles/index.scss';

export const App: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  );
};
