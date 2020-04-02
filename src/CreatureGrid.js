import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CreatureCard from './CreatureCard'

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

export default function CreatureGrid(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {props.creatures.map((value) => (
            <Grid key={value.name} item>
              <CreatureCard
                creature={value}
                hemisphere={props.hemisphere}
              />
             </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

