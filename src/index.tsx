import { createRoot } from 'react-dom/client';
import { App, AppProvider } from 'app';
import 'shared/config/i18n/i18n';
import 'shared/lib/prelude/prelude/prelude';

const div = document.getElementById('root');

if (!div) throw new Error('The root element does not exist in the html document');

createRoot(div).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
