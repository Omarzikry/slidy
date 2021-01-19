import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./theme/globalStyle";
import theme from "./theme/theme";
import { ThemeProvider } from "styled-components";
import App from "./containers/App/App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
