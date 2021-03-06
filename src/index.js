import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "../static/css/index.css";
import { GlobalContextProvider } from "../src/component/context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  //     <div>
  //        {/* 主要開發位置 */}
  //     </div>
  //     <App />
  // </React.StrictMode>

  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
