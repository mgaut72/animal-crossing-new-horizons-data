
import React from 'react';
import BaseAppBar from './BaseAppBar';

export default function Home(props) {
  return (
    <>
    <BaseAppBar toggleDrawer={props.toggleDrawer}/>
    <h1>This is the home page</h1>
    </>
  );
}
