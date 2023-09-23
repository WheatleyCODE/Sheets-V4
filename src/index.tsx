import { createRoot } from "react-dom/client";
import { App, AppProvider } from "app";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
