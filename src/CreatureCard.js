import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { timeRangesToStr, monthRangesToStr } from './DateTimeUtils';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    flexGrow: 1,
    minWidth: 275,
    display: 'block',
    width: '30vw',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function CreatureCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.creature.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.creature.type}
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography>Price</Typography>
          </Grid>
          <Grid item xs={1}>
            <NotificationsIcon/>
          </Grid>
          <Grid item xs={7}>
            <Typography>{props.creature.price.toLocaleString(navigator.language, {minimumFractionDigits: 0})}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Location</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{props.creature.location}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Active Time(s)</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{timeRangesToStr(props.creature.times)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Active Month(s) (North)</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{monthRangesToStr(props.creature.months, "north")}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Active Month(s) (South)</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{monthRangesToStr(props.creature.months, "south")}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

