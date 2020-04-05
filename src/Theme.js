import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const darkBrown = '#6b3600'

export default createMuiTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    common: {
      white: "#F5F2DC",
    },
    primary: {
      main: blue[600],
      contrastText: darkBrown,
    },
    secondary: {
      main: green[500],
      contrastText: darkBrown,
    },
    text: {
      primary: darkBrown,
    },
    background: {
      paper: "#E8DAb6",
      default: "#733c00",
    },
  },
});
