import React from 'react';
import Typography from '@material-ui/core/Typography';
import BaseAppBar from './BaseAppBar';

export default function Flowers(props) {
  return (
    <>
    <BaseAppBar
      title="Flowers"
      toggleDrawer={props.toggleDrawer}
    />
    <Typography>Info about flower types and crossbreeding coming soon</Typography>
    </>
  );
}
