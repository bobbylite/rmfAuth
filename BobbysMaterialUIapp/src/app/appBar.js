import React from 'react';
import AppBar from 'material-ui/AppBar';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const AppBarFacts = () => (
  <AppBar
    title={"Real Mike Facts"}
    style={{position: 'fixed', top: 0, left: 0}}
    showMenuIconButton={false}
  >
  logout goes here
  </AppBar>
);

export default AppBarFacts;