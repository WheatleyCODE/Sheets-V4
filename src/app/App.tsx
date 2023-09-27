import { FC, Suspense } from 'react';
import { useTheme, AppRouter } from './providers';
import { Navbar } from 'widgets/navbar';
import { PageLoader } from 'widgets/page-loader/ui/PageLoader';
// import { onStream } from 'shared/lib/iterators';
import { classNames } from 'shared/lib/class-names';
import './styles/index.scss';

// async function streamTests() {
//   const strm = onStream<MouseEvent>(document.body, 'click');

//   const stream = strm
//     .filter(({ clientX }) => clientX < 100)
//     .map(({ clientX, clientY }) => ({ clientX, clientY }))
//     .map((clientRect) => ({ clientRect, flag: true }));

//   stream.subscribe((el) => console.log(el.clientRect, 'this is subs'));
//   stream.subscribe((el) => console.log(el.flag, 'this is subs2'));

//   for await (const e of stream) {
//     console.log(e);
//   }
// }

// streamTests();

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
