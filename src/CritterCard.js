import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { timeRangesToStr, monthRangesToStr } from './DateTimeUtils';
import getIconForCritterName from './CritterIcons';


const useStyles = makeStyles((theme) => ({
  cardRoot: {
    flexGrow: 1,
    minWidth: 275,
    display: 'block',
    width: '30vw',
  },
  pos: {
    marginBottom: 12,
  },
  media: {
  },
}));

export default function CritterCard(props) {
  const classes = useStyles();

  const handleMuseumChange = (e) => {
    let newSet = new Set(props.museum)
    if (e.target.checked) {
      newSet.add(e.target.name);
    }
    else {
      newSet.delete(e.target.name);
    }
    props.setMuseum(newSet);
  };

  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <CardMedia
              component="img"
              className={classes.media}
              image={getIconForCritterName(props.critter.name)}
              title={props.critter.name + " icon"}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.critter.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.pos} color="textSecondary">
              {props.critter.type}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Price</Typography>
          </Grid>
          <Grid item xs={1}>
            <NotificationsIcon/>
          </Grid>
          <Grid item xs={7}>
            <Typography>{props.critter.price.toLocaleString(navigator.language, {minimumFractionDigits: 0})}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Location</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{props.critter.location}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Active Time(s)</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{timeRangesToStr(props.critter.times)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Active Month(s)</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{monthRangesToStr(props.critter.months, props.hemisphere)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>In My Museum</Typography>
          </Grid>
          <Grid item xs={8}>
            <Switch
              checked={props.museum.has(props.critter.name)}
              onChange={handleMuseumChange}
              name={props.critter.name}
              inputProps={{ 'aria-label': 'in my museum toggle' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

