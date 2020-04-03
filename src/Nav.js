import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  filtersFormControl: {
    margin: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  offset: theme.mixins.toolbar,
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    background: theme.palette.primary.main,
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleHemisphereChange = (e) => {
    props.setHemisphere(e.target.value);
  };

  const handleSortByChange = (e) => {
    props.setSortBy(e.target.value);
  }

  const handleFilterStateChange = (e) => {
    const fname = e.target.name;
    const newVal = e.target.checked;
    props.setFiltersState({ ...props.filtersState, [fname]: {...props.filtersState[fname], enabled: newVal}})
  };

  const handleDataSetStateChange = (e) => {
    const fname = e.target.name;
    const newVal = e.target.checked;
    props.setDataSets({ ...props.dataSets, [fname]: {...props.dataSets[fname], enabled: newVal}})
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <FormControl className={classes.filtersFormControl} component="fieldset">
        <FormLabel component="legend">Creature Types</FormLabel>
        <FormGroup>
          {Object.entries(props.dataSets).map(([k,v]) => (
          <FormControlLabel
            control={<Switch checked={v.enabled} onChange={handleDataSetStateChange} name={k} />}
            label={v.label}
          />
          ))}
        </FormGroup>
      </FormControl>
      <Divider />
      <FormControl className={classes.filtersFormControl} component="fieldset">
        <FormLabel component="legend">Filters</FormLabel>
        <FormGroup>
          {Object.entries(props.filtersState).map(([k,v]) => (
            <FormControlLabel
              control={<Switch checked={v.enabled} onChange={handleFilterStateChange} name={k} />}
              label={v.label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Divider />
      <FormControl className={classes.filtersFormControl} component="fieldset">
        <FormLabel component="legend">Sort</FormLabel>
        <RadioGroup aria-label="sort by" name="sortby1" value={props.sortBy} onChange={handleSortByChange}>
          {props.sortByOptions.map(option => (
            <FormControlLabel value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <FormControl className={classes.filtersFormControl} component="fieldset">
        <FormLabel component="legend">Hemisphere</FormLabel>
        <RadioGroup aria-label="hemisphere" name="hemisphere1" value={props.hemisphere} onChange={handleHemisphereChange}>
          <FormControlLabel value="north" control={<Radio />} label="North" />
          <FormControlLabel value="south" control={<Radio />} label="South" />
        </RadioGroup>
      </FormControl>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <TuneIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            New Horizons Creature Companion
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => props.onSearchChange(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="settings and filters">
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
        <div className={classes.toolbar}class />
        <div className={classes.offset} />
        {props.content}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default ResponsiveDrawer;
