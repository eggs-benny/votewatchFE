import React from "react";
import { useRoutes } from "react-router-dom";
import router from "src/router";
import "./App.css";
import AlertMessage from "./components/Shared/AlertMessage";
import { useDispatch, useSelector } from "./store";
import { hideAlertMessage } from "./slices/alert";

function App() {
  const content = useRoutes(router);
  const dispatch = useDispatch();

  const { show, message, severity } = useSelector((state) => state.alert);

  return (
    <>
      <AlertMessage
        showAlertMessage={show}
        alertMessage={{ message: message, severity: severity }}
        setShowAlertMessage={() => {
          dispatch(hideAlertMessage());
        }}
      />
      {content}
    </>
  );
}

export default App;
