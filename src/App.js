import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NookPhone from './AppFrame';
import theme from './Theme'

export default function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NookPhone />
      </MuiThemeProvider>
    </div>
  );
}
