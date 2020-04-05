import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Fish from 'mdi-material-ui/Fish';
import Bug from 'mdi-material-ui/Bug';
import getIconForCritterName from './CritterIcons';
import ActiveMonths from './CritterCard/ActiveMonths';
import ActiveHours from './CritterCard/ActiveHours';
import Location from './CritterCard/Location';
import Price from './CritterCard/Price';


const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
    flexGrow: 1,
    minWidth: 350,
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
  wholeCardGrid: {
  },
  detailsGrid: {
    height: '100%',
    width: '100%',
  },
  detailsGridItem: {
    height: '100%',
    width: '100%',
  },
  critterType: {
    height: '20',
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      height: 30,
    },
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

  const icon = props.critter.type === "Bug"
    ? (<Bug className={classes.critterType} />)
    : (<Fish className={classes.critterType} />)

  const imageAndLabelGridItems = (
    <>
    <Grid item xs={12} alignItems="right">
      {icon}
    </Grid>
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
    <Grid item xs={12}/>
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
    <>
      <Grid item xs={12} className={classes.detailsGridItem}>
        <Price critter={props.critter} />
      </Grid>
      <Grid item xs={12} className={classes.detailsGridItem}>
        <Location critter={props.critter} />
      </Grid>
      <Grid item xs={12}>
        <ActiveHours
          critter={props.critter}
          hemisphere={props.hemisphere}
        />
      </Grid>
      <Grid item xs={12}>
        <ActiveMonths
          critter={props.critter}
          hemisphere={props.hemisphere}
        />
      </Grid>
    </>
  );



  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Grid container alignItems="center" direction="row" className={classes.wholeCardGrid}>
          <Grid container alignItems="center" xs={6}  justify="center">
            {imageAndLabelGridItems}
          </Grid>
          <Grid container alignItems="center" xs={6} justify="space-between" className={classes.detailsGrid} direction="column">
            {details}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

