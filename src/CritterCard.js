import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
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
    minWidth: 350,
    height: '100%',
    display: 'block',
    width: '30vw',
  },
  pos: {
    marginBottom: 12,
  },
  cardName: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(0.1),
    border: 'outset',
    borderWidth: 2,
    transform: 'rotate(-3deg)',
  },
  media: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  wholeCardGrid: {
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
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

  const imageAndLabelGridItems = (
    <>
    <Grid item xs={12} alignItems="center">
      <CardMedia
        component="img"
        className={classes.media}
        image={getIconForCritterName(props.critter.name)}
        title={props.critter.name + " icon"}
      />
    </Grid>
    <Typography gutterBottom className={classes.cardName} align="center" variant="h6" component="h3">
      {props.critter.name}
    </Typography>
    <Grid item xs={12}>
      <Typography className={classes.pos} align="center" variant="subtitle2" color="textSecondary">
        {props.critter.type}
      </Typography>
    </Grid>
    <Grid item xs={4}>
      <Typography>In My Museum</Typography>
    </Grid>
    <Grid item xs={8}>
      <Switch
        size="small"
        checked={props.museum.has(props.critter.name)}
        onChange={handleMuseumChange}
        name={props.critter.name}
        inputProps={{ 'aria-label': 'in my museum toggle' }}
      />
    </Grid>
    </>
  );

  const details = (
    <Grid container alignItems="center" justify="center" direction="row">
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
    </Grid>
  );



  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardContent>
        <Grid container alignItems="center" direction="row" className={classes.wholeCardGrid}>
          <Grid container alignItems="center" xs={5}  justify="center">
            {imageAndLabelGridItems}
          </Grid>
          <Grid xs={1}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid container alignItems="center" xs={6}>
            {details}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

