import React from "react";
import { createRoot } from "react-dom/client";
import MarriageBio from "../marriage-bio-beautiful.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MarriageBio />
  </React.StrictMode>
);
