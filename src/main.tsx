import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import Providers from "./Providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Providers>
  </StrictMode>
);
