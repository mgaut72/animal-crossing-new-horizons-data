import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const darkBrown = '#6b3600'

export default createMuiTheme({
  palette: {
    primary: {
      main: blue[400],
      contrastText: darkBrown,
    },
    secondary: {
      main: green[400],
      contrastText: darkBrown,
    },
    text: {
      primary: darkBrown,
    },
    background: {
      paper: "#d7ccc8",
      default: "#efebe9",
    },
  },
});
