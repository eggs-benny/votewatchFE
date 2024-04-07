import React from "react";
import { useRoutes } from "react-router-dom";
import router from "src/router";
import "./App.css";

function App() {
  const content = useRoutes(router);
  return <>{content}</>;
}

export default App;
