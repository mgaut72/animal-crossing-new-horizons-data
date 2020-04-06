import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    fontSize: 12,
  },
  "palette": {
    "common": {
      "black": "rgba(84, 43, 0, 1)",
      "white": "rgba(245, 242, 220, 1)"
    },
    "background": {
      "paper": "rgba(232, 218, 182, 1)",
      "default": "rgba(210, 180, 140, 1)"
    },
    "primary": {
      "light": "rgba(103, 218, 255, 1)",
      "main": "rgba(3, 169, 244, 1)",
      "dark": "rgba(0, 122, 193, 1)",
      "contrastText": "rgba(84, 43, 0, 1)"
    },
    "secondary": {
      "light": "rgba(174, 229, 113, 1)",
      "main": "rgba(124, 179, 66, 1)",
      "dark": "rgba(75, 131, 13, 1)",
      "contrastText": "rgba(84, 43, 0, 1)"
    },
    "error": {
      "light": "#e57373",
      "main": "#f44336",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "rgba(84, 43, 0, 1)",
      "secondary": "rgba(139, 87, 42, 1)",
      "disabled": "rgba(151, 126, 108, 1)",
      "hint": "rgba(151, 126, 108, 1)"
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.6em'
        },
        '*::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px #c1a37b',
          webkitBoxShadow: 'inset 0 0 6px #c1a37b'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
          outline: '1px solid slategrey'
        }
      }
    }
  }
});
