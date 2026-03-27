import React from "react";
import { createRoot } from "react-dom/client";
import MarriageBio from "../marriage-bio-beautiful.jsx";
import ClosingOverlay from "./ClosingOverlay.jsx";
import "./index.css";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <div className="app-content">
        <MarriageBio />
      </div>
      <ClosingOverlay />
    </>
  </React.StrictMode>
);
