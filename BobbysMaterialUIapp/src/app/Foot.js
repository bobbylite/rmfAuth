import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const Foot = () => (

  

  <AppBar
    style={{position: 'fixed', zIndex: -1, height: 40, bottom: 0, left: 0, backgroundColor: '#bdc3c7', opacity: 0.6}}
    showMenuIconButton={false}
  >
    <FlatButton style={{position: 'absolute', opacity: 1, left: '25%', right: '25%'}} label="Share Us on Twitter" href={"https://twitter.com/share"} secondary={true}/>
    
  </AppBar>
);

export default Foot;