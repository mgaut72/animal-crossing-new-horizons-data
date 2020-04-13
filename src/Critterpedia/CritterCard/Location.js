import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Location(props) {
  return (
    <Grid container alignItems="center" direction="row">
      <Grid item xs={6}>
        <Typography>Location</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{props.critter.location}</Typography>
      </Grid>
    </Grid>
  );
}
