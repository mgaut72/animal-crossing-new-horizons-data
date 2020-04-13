import React from 'react';
import Typography from '@material-ui/core/Typography';
import { isCurrentlyActive, timeRangeToStr } from '../DateTimeUtils';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TimeIcon from '@material-ui/icons/WatchLater';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.secondary.main,
  },
  inactive: {
    color: theme.palette.divider,
  },
  timeList: {
    paddingTop: 0,
  }
}));

const getItems = (times, iconClass) => {
  if (typeof times === 'string' || times instanceof String) {
    const timeStr = times === "All" ? "All" : "Unknown"
    return getItem(timeStr, iconClass)
  }
  return times.map((timeRange) => getItem(timeRangeToStr(timeRange), iconClass));
};

const getItem = (itemStr, iconClass) => {
  return (
    <ListItem>
      <ListItemIcon>
        <TimeIcon className={iconClass} />
      </ListItemIcon>
      <ListItemText
        primary={itemStr}
      />
    </ListItem>
  );
}


export default function Location(props) {
  const classes = useStyles();
  const iconClass =  isCurrentlyActive(props.critter, props.hemisphere) ? classes.active : classes.inactive;

  return (
    <>
    <Typography align="center">Active Hours</Typography>
    <List dense={true} className={classes.timeList}>
      {getItems(props.critter.times, iconClass)}
    </List>
    </>
  );
}
