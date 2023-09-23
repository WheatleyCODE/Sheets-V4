import { App } from "./App";
import { AppProvider } from "./app-provider/AppProvider";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
