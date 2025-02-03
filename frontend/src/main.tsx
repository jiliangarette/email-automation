import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./router/routes";
import "./styles/index.css";

const RouterWrapper = () => useRoutes(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  </StrictMode>
);
