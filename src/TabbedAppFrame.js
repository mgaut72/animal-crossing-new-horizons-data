import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import Critterpedia from './TabbedCritterpedia';
import Flowers from './Flowers';
import Home from './Home';
import clsx from 'clsx';
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route,
  Link as RouterLink,
  useRouteMatch,
  useParams
} from "react-router-dom";

const drawerWidth = 240;

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    dispaly: 'flex',
  },
  appBar: {
    display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: `calc(${drawerWidth}px + 2.12px - 0.6em)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  offset: theme.mixins.toolbar,
  toolBarHeight: {
    ...theme.mixins.toolbar,
  },
  titleContainer: {
    ...theme.mixins.toolbar,
  },
  divider: {
    width: '0.6em',  // same as scroll bar
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  },
  tabsContainer: {
    flexGrow: 1,
    //[theme.breakpoints.up('sm')]: {
      //width: `calc(100% - ${drawerWidth}px)`,
      //marginLeft: drawerWidth,
    //},
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <Router>
      <Route
        path="/"
        render={({ location }) => (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar disableGutters={true}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer}
                  className={classes.menuButton}
                >
                  <TuneIcon />
                </IconButton>
                <Typography align="center" className={classes.title} variant="h6">
                  Nookphone
                </Typography>
                <Divider className={clsx(classes.divider, classes.toolBarHeight)} orientation="vertical" flexitem/>
              <Tabs
                variant="fullWidth"
                value={location.pathname}
                aria-label="nav tabs example"
                className={clsx(classes.toolBarHeight, classes.tabsContainer)}
              >
                <Tab className={classes.toolBarHeight} label="Home" value="/" component={RouterLink} to="/"/>
                <Tab className={classes.toolBarHeight} label="Critterpedia" value="/critterpedia" component={RouterLink} to="/critterpedia"/>
                <Tab className={classes.toolBarHeight} label="Flowers" value="/flowers" component={RouterLink} to="/flowers"/>
              </Tabs>
            </Toolbar>
            </AppBar>
            <main className={classes.content}>
              <div className={classes.offset} />
              <RouterSwitch>
                <Route exact path="/" render={() => <Home toggleDrawer={() => {return}}/>}/>
                <Route exact path="/critterpedia"  render={() => <Critterpedia mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>}/>
                <Route exact path="/flowers" render={() => <Flowers toggleDrawer={() => {return}}/>}/>
              </RouterSwitch>
            </main>
          </div>
        )}
      />
    </Router>
  );
}
