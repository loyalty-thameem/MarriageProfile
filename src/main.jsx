import React from "react";
import { createRoot } from "react-dom/client";
import MarriageBio from "../marriage-bio-beautiful.jsx";
import ClosingOverlay from "./ClosingOverlay.jsx";
import "./index.css";
import "./i18n";

// Set `VITE_SHOW_CLOSING_OVERLAY=true` to enable the full-screen closing message.
const SHOW_CLOSING_OVERLAY =
  import.meta.env.VITE_SHOW_CLOSING_OVERLAY === "true";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <div className="app-content">
        <MarriageBio />
      </div>
      {SHOW_CLOSING_OVERLAY ? <ClosingOverlay /> : null}
    </>
  </React.StrictMode>
);
