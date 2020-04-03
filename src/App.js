import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CreatureCompanion from './CreatureCompanion';
import theme from './Theme'


export default function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <CreatureCompanion />
      </MuiThemeProvider>
    </div>
  );
}
