import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const theme = createTheme({

  palette: {
    primary: {
      main: teal[500],
      darker: teal[900],
    },
    neutral: {
      main: teal[200],
      contrastText: '#fff',
    },
    negative: {
      main: 'red'
    },
    other: {
      main: 'grey'
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProSidebarProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>

      </ProSidebarProvider>
    </BrowserRouter>

  </React.StrictMode>
);
