import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GitHubProvider } from "./context/context";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GitHubProvider>
      <App />
    </GitHubProvider>
  </React.StrictMode>
);
