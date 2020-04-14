import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  offset: theme.mixins.toolbar,
  more: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function BaseAppBar(props) {
  const { title, toggleDrawer, more } = props;
  const classes = useStyles()

  return (
    <>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <TuneIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          {title}
        </Typography>
        {more}
      </Toolbar>
    </AppBar>
    <div className={classes.offset} />
    </>
  );
}
