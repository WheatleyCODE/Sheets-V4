import { createRoot } from 'react-dom/client';
import { App, AppProvider } from 'app';
import 'shared/config/i18n/i18n';
import 'shared/lib/prelude/prelude/prelude';

const div = document.getElementById('root') as HTMLElement;
const root = createRoot(div);

root.render(
  <AppProvider>
    <App />
  </AppProvider>,
);
