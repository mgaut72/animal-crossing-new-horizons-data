import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CritterCard from './CritterCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
  },
  paper: {
    height: 140,
    width: 100,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function CritterGrid(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={6}>
          {props.critters.map((value) => (
            <Grid key={value.name} item>
              <CritterCard
                critter={value}
                hemisphere={props.hemisphere}
                museum={props.museum}
                setMuseum={props.setMuseum}
              />
             </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

