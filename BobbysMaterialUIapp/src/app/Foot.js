import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const Foot = () => (



  <AppBar
    style={{position: 'fixed', zIndex: -1, margin: 0, padding: 0, marginBottom: 0, height: 40, width: '100%', right: '1%', left: '.1%', backgroundColor: '#bdc3c7', opacity: 0.6}}
    showMenuIconButton={false}
  >
    <FlatButton style={{position: 'fixed', padding: 0, margin: 'auto', opacity: 1, right: '25%'}} label="Share Us on Twitter" href={"https://twitter.com/intent/tweet?text=Check%20out%20the%20best%20MIKE%20facts%20at%20%40realMikeFacts.%20You%20can%20make%20your%20own%20real%20MIKE%20facts%20at%20&url=http://realMikeFacts.com"} secondary={true}/>
  </AppBar>
);

export default Foot;
