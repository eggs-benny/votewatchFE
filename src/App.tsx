import React from "react";
import { useRoutes } from "react-router-dom";
import router from "src/router";
import AlertMessage from "./components/Shared/AlertMessage";
import { useDispatch, useSelector } from "./store";
import { hideAlertMessage } from "./slices/alert";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/base";

function App() {
  const content = useRoutes(router);
  const dispatch = useDispatch();

  const { show, message, severity } = useSelector((state) => state.alert);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertMessage
          showAlertMessage={show as boolean}
          alertMessage={{ message: message, severity: severity }}
          setShowAlertMessage={() => {
            dispatch(hideAlertMessage());
          }}
        />
        {content}
      </ThemeProvider>
    </>
  );
}

export default App;
