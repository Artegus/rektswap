import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Providers from './providers'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from './providers/chakra/theme/theme';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);
