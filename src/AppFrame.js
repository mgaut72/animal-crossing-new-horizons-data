import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Critterpedia from './TabbedCritterpedia';
import Flowers from './Flowers';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route,
  Link as RouterLink,
  useRouteMatch,
  useParams
} from "react-router-dom";


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  drawerToolbar: {
    ...theme.mixins.toolbar,
    //paddingLeft: theme.spacing(3),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerTitle: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));



function ListItemLink(props) {
  const { icon, primary, to, onClick } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} onClick={onClick}{...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


export default function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.drawerToolbar}>
        <RouterLink className={classes.drawerTitle} to="/">
          <Typography noWrap component="h1" variant="h4">Nook Phone</Typography>
        </RouterLink>
      </div>
      <Divider />
      <List>
        <ListItemLink to="/critterpedia" primary="Critterpedia" icon={<SearchIcon />} onClick={() => setMobileOpen(false)}/>
        <ListItemLink to="/flowers" primary="Flowers" icon={<SearchIcon />}  onClick={() => setMobileOpen(false)}/>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <SwipeableDrawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={() => {setMobileOpen(false)}}
              onOpen={() => {setMobileOpen(true)}}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </SwipeableDrawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Route exact path="/" render={() => <Home toggleDrawer={handleDrawerToggle}/>}/>
          <Route path="/critterpedia"  render={() => <Critterpedia toggleDrawer={handleDrawerToggle}/>}/>
          <Route path="/flowers" render={() => <Flowers toggleDrawer={handleDrawerToggle}/>}/>
        </main>
      </Router>
    </div>
  );
}
