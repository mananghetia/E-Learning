import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </ReduxProvider>
);

