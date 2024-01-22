import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import './index.scss';
import { ThemeProvider } from '@mui/material';
//@ts-ignore
import { theme } from './theme';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createRoot } from 'react-dom/client';
const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>,
);
