import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "./contexts/Theme/ThemeContext.tsx";
import TanstackProvider from "./tanstackQuery/TanstackProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TanstackProvider>
        <App />
      </TanstackProvider>
    </ThemeProvider>
  </StrictMode>
);
