import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { isCurrentMonthActive } from '../DateTimeUtils';


const useStyles = makeStyles((theme) => ({
  label: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(0.1),
    border: 'outset',
    borderWidth: 2,
    transform: 'rotate(-4deg)',
  },
  baseHourGridContainer: {
    width: "100%",
    borderBottom: `3px double ${theme.palette.text.secondary}`,
    //borderRadius: theme.shape.borderRadius,
    //color: theme.palette.text.secondary,
  },
  leftTick: {
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
  },
  noTick: {
    paddingLeft: "1px",
  },
  rightTick: {
    borderRight: `1px solid ${theme.palette.text.secondary}`,
  },
  hourSlot: {
    paddingLeft: 1,
    paddingRight: 1,
    fontSize: 8,
    [theme.breakpoints.up("md")]: {
      fontSize: 9,
      paddingLeft: 1,
      paddingRight: 1,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 9,
      paddingLeft: 2,
      paddingRight: 2,
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: 10,
      paddingLeft: 3,
      paddingRight: 3,
    },
    color: 'transparent',
  },
  hourLabel: {
    fontSize: 10,
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.fontSize,
    },
  },
  activeActiveHour: {
    backgroundColor: theme.palette.secondary.main,
  },
  inactiveActiveHour: {
    backgroundColor: theme.palette.divider,
  },
  currentHour: {
    color: theme.palette.error.dark,
  },
}));


export default function ActiveMonths(props) {
  const theme = useTheme();
  const classes = useStyles();

  const activeHours = props.critter.activeHours
  const now = new Date()
  const currHour = now.getHours()
  const currMins = now.getMinutes()
  let currDisplay;
  if (currMins <= 20) {
    currDisplay = "|  "
  } else if (currMins > 20 && currMins <= 40) {
    currDisplay = " | "
  } else {
    currDisplay = "  |"
  }

  const isCurrMonthActive = isCurrentMonthActive(props.critter, props.hemisphere)

  return (
    <>
    <Typography align="center">Active Hours</Typography>
    <Grid container alignItems="center" direction="row" spacing={theme.spacing(0.3)}>
      {["12", "12"].map(hourLabel => (
        <Grid
          alignItems="left"
          xs={6}
          justify="left"
          //className={clsx(hourNum % 6 === 0 ? classes.leftTick : classes.noTick, hourNum === 23 && classes.rightTick)}
        >
          <Typography
            className={clsx(classes.hourLabel)}
            align="left"
          >
            {hourLabel}
          </Typography>
        </Grid>
      ))}
    </Grid>
    <Grid container alignItems="center" direction="row" spacing={theme.spacing(0.3)}>
      {["AM", "6", "PM", "6"].map(hourLabel => (
        <Grid
          alignItems="left"
          xs={3}
          justify="left"
          //className={clsx(hourNum % 6 === 0 ? classes.leftTick : classes.noTick, hourNum === 23 && classes.rightTick)}
        >
          <Typography
            className={clsx(classes.hourLabel)}
            align="left"
          >
            {hourLabel}
          </Typography>
        </Grid>
      ))}
    </Grid>
    <Grid container alignItems="center" direction="row" spacing={theme.spacing(0.3)}>
      {[...Array(24).keys()].map(hourNum => (
        <Grid
          alignItems="center"
          xs={0.5}
          justify="center"
          className={clsx(hourNum % 6 === 0 ? classes.leftTick : classes.noTick, hourNum === 23 && classes.rightTick)}
          noWrap
        >
          <Typography
            className={clsx(classes.hourSlot)}
            align="center"
          >
            {currDisplay}
          </Typography>
        </Grid>
      ))}
    </Grid>
    <Grid container alignItems="center" direction="row" spacing={theme.spacing(0.3)}>
      {[...Array(24).keys()].map(hourNum => (
        <Grid
          alignItems="center"
          xs={0.5}
          justify="center"
          className={clsx(hourNum % 3 === 0 ? classes.leftTick : classes.noTick, hourNum === 23 && classes.rightTick)}
          noWrap
        >
          <Typography
            className={clsx(classes.hourSlot)}
            align="center"
          >
            {currDisplay}
          </Typography>
        </Grid>
      ))}
    </Grid>
    <Grid container alignItems="center" direction="row" spacing={theme.spacing(0.3)}>
      {[...Array(24).keys()].map(hourNum => (
        <Grid
          alignItems="center"
          xs={0.5}
          justify="center"
          className={clsx(classes.leftTick, hourNum === 23 && classes.rightTick)}
          noWrap
        >
          <Typography
            className={clsx(classes.hourSlot, hourNum === currHour && classes.currentHour)}
            align="center"
          >
            {currDisplay}
          </Typography>
        </Grid>
      ))}
    </Grid>
    <Grid container alignItems="center" direction="row" spacing={theme.spacing(0.3)} className={classes.baseHourGridContainer}>
      {[...Array(24).keys()].map(hourNum => (
        <Grid
          alignItems="center"
          xs={0.5}
          justify="center"
          className={clsx(classes.leftTick, hourNum === 23 && classes.rightTick)}
          noWrap
        >
          <Typography
            className={clsx(classes.hourSlot, hourNum === currHour && classes.currentHour, activeHours.includes(hourNum) && (isCurrMonthActive ? classes.activeActiveHour : classes.inactiveActiveHour))}
            align="center"
          >
            {currDisplay}
          </Typography>
        </Grid>
      ))}
    </Grid>
    </>
  );
}

