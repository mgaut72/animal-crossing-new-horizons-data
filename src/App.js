import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Critterpedia from './Critterpedia';
import theme from './Theme'


export default function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Critterpedia />
      </MuiThemeProvider>
    </div>
  );
}
