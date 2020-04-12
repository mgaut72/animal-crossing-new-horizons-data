import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { isCurrentlyActive, allMonths, getActiveMonths, monthToStr } from '../DateTimeUtils';


const useStyles = makeStyles((theme) => ({
  cardName: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(0.1),
    border: 'outset',
    borderWidth: 2,
    transform: 'rotate(-4deg)',
  },
  cardContent: {
    padding: 4,
    "&:last-child": {
      paddingBottom: 4
    },
  },
  media: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  monthGridContainer: {
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: theme.shape.borderRadius,
    //color: theme.palette.text.secondary,
  },
  monthGridItem: {
    border: `1px solid ${theme.palette.text.secondary}`,
    //borderRadius: theme.shape.borderRadius,
    //color: theme.palette.text.secondary,
    //padding: theme.spacing(0.1),
  },
  currentMonthGridItem: {
    border: `1px solid ${theme.palette.error.dark}`,
    borderRadius: theme.shape.borderRadius,
  },
  monthTypography: {
    padding: 2,
    fontSize: 10,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.fontSize,
    },
    color: theme.palette.text.secondary,
  },
  activeActive: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
    borderRadius: "35%",
    backgroundColor: theme.palette.secondary.main,
  },
  activeInactive: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
    borderRadius: "35%",
    backgroundColor: theme.palette.divider,
  },
}));


export default function ActiveMonths(props) {
  const theme = useTheme();
  const classes = useStyles();

  const activeMonths = getActiveMonths(props.critter, props.hemisphere)
  const currMonth = new Date().getMonth() + 1;
  const isActive = isCurrentlyActive(props.critter, props.hemisphere);

  const getClass = (month) => {
    if (activeMonths.includes(month)) {
      return isActive ? classes.activeActive : classes.activeInactive;
    } else {
      return false;
    }
  }

  return (
    <>
    <Typography align="center">Seasonality</Typography>
    <Grid container alignItems="center" direction="row" spacing={theme.spacing(0.3)} className={classes.monthGridContainer}>
      {allMonths.map(monthNum => (
        <Grid
          alignItems="center"
          xs={3}
          justify="center"
          className={monthNum === currMonth ? classes.currentMonthGridItem : classes.monthGridItem}
        >
          <Typography
            className={clsx(classes.monthTypography, getClass(monthNum))}
            align="center"
          >
            {monthToStr(monthNum)}
          </Typography>
        </Grid>
      ))}
    </Grid>
    </>
  );
}

