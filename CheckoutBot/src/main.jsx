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
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },

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
