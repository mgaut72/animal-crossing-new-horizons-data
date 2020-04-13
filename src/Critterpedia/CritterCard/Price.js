import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NotificationsIcon from '@material-ui/icons/Notifications';

export default function Location(props) {
  return (
    <Grid container alignItems="center" direction="row">
      <Grid item xs={6}>
        <Typography>Price</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <NotificationsIcon/>
          {props.critter.price.toLocaleString(navigator.language, {minimumFractionDigits: 0})}
        </Typography>
      </Grid>
    </Grid>
  );
}
