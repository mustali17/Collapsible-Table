import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Table from "./Table";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Table />
  </StrictMode>
);
