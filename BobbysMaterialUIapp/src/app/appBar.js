import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Img from 'react-image';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const styles = {
  imgStyle: {
    margin: 0,
    height: 50, 
    bottom: 0,
    left: -20,
  },
  imgContainer: {
    margin: 0,
    left: -10,
    top: 10,
    position: 'fixed',
    height: 50,
  }, 
  imgBanner: {
    height: 70, 
    paddingLeft: -50,
    position: 'fixed',
    top: '4%',
    left: '50%',
    marginTop: -50,
    marginLeft: -95,
    zIndex: '0',
  }
}
const AppBarFacts = () => (
  <AppBar
    title={'#realMikeFacts'}
    style={{position: 'fixed', backgroundColor: '#BA1313', opacity: 0.8, top: 0, left: 0, zIndex: 1}}
    showMenuIconButton={false}
  >
  </AppBar>
);

//** <FlatButton style={styles.imgContainer}><Img style={styles.imgStyle} src="http://realmikefacts.com:8080/imgMikeHash" /></FlatButton> */



export default AppBarFacts;