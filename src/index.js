import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async"; // pour gérer les balises <head> de manière asynchrone et dynamique dans React
import { StoreProvider } from "./Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
