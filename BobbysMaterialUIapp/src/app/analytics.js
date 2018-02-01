/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import Share from 'material-ui/svg-icons/social/mood';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import Home from 'material-ui/svg-icons/action/home';
import Menu from 'material-ui/svg-icons/navigation/menu';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBarFacts from './appBar';
import Foot from './Foot';
import AuthService from './AuthService';
import withAuth from './withAuth';
import Img from 'react-image';

const Auth = new AuthService();

const styleAction = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 60,
    left: 'auto',
    position: 'fixed',
};

const styles = {
  home: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
  },
  bottom: {
    margin: 0,
    bottom: 1,
    position: 'fixed',
  },
  top: {
    textAlign: 'center',
    paddingTop: 0,
    marginTop: 0,
    zIndex: 1,
  },
  container: {
    textAlign: 'center',
    paddingTop: 10,
  },
  center: {
    textAlign: 'center',
  },
  share: {
    margin: 0,
    bottom: -50,
    textAlign: 'center',
  },
  homeButton: {
    margin: 0,
    top: 'auto',
    left: 0,
    bottom: 0,
    position: 'fixed',
  },
  homeIcon: {
    margin: 0,
    top: 'auto',
    left: 30,
    bottom: 8,
    color: '#e74c3c',
    position: 'fixed',
  },
  logoutButton: {
    margin: 0,
    top: 'auto',
    right: 0,
    bottom: 0,
    position: 'fixed',
  },
  logoutIcon: {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: 8,
    color: '#e74c3c',
    position: 'fixed',
  },
  LogoStyle: {
    margin: 0,
    height: 150,
    position: 'center',
    paddingTop: 80,
  },
    menuButton: {
    margin: 0,
    top: 20,
    left: 0,
    position: 'fixed',
    zIndex: 10
  },
    menuIcon: {
    margin: 0,
    left: 30,
    top: 25,
    color: '#fff',
    position: 'fixed',
    zIndex: 10
  },
  credits: {
    margin: 0,
    position: 'fixed',
    bottom: 10,
    left: 60
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Analytics extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose2 = this.handleRequestClose2.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleTouchTap2 = this.handleTouchTap2.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      open: false, // This is the draw being opened or not.
      open2: false, // must change this name.
      tweetValue: '',
      un: localStorage.id_username
    };

    console.log("Starting request");
    this.fetch('http://96.232.94.109:8080/Data' + this.state.tweetValue, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: this.state.un, // This is a test to retrieve POST
      })
    }).then(res => {
      console.log(res)
    })


  }

  fetch(url, options) {
      // performs api calls sending the required authentication headers
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }

      // Setting Authorization header
      // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

      return fetch(url, {
          headers,
          ...options
      })
          .then(this._checkStatus)
          .then(response => response.json())
  }

  handleTextFieldChange = (e) => {
    this.setState({
      tweetValue: e.target.value,
    });
  }

  handleRequestClose2 = () => {
    this.request();

    this.setState({
      open2: false,
      tweetValue: '',
    });
  }

    handleTouchTap2 = () => {
    this.setState({
      open2: true,
    });
  }

    handleLogout = () => {
      Auth.logout()
      this.props.history.replace('/login');
    };

    handleMenuOpen = () => {this.setState({open: !this.state.open})};
    handleMenuClose = () => {this.setState({open: false})};

  request = () => {
    fetch('http://96.232.94.109:8080/Message/' + this.state.tweetValue, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: this.state.un, // This is a test to retrieve POST
        tweet: this.state.tweetValue, // This is a test to retrieve POST
      })
    })
  }
  render() {
    const standardActions2 = (
      // Make the text field blank on submission

      <FlatButton
        label="Send!"
        primary={true}
        onTouchTap={this.handleRequestClose2}
      />
    );

   return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.center} >
          <AppBarFacts style={styles.top}/>
          <FlatButton style={styles.menuButton} onClick={this.handleMenuOpen.bind(this)}>
            <Menu style={styles.menuIcon}/>
          </FlatButton>
          <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <AppBarFacts style={styles.top}/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <MenuItem onClick={this.handleMenuClose}>Home</MenuItem>
            <MenuItem onClick={this.handleClose}>@realMikeFacts 🔥lit tweets</MenuItem>
            <MenuItem onClick={this.handleClose}>About Us</MenuItem>
            <MenuItem onClick={this.handleLogout.bind(this)}><Logout style={styles.logoutIcon}/>Logout</MenuItem>
            <div style={styles.credits}>
            <br></br>
              realMikeFacts.com
              <br></br>
              A Bobby Luisi project
              <br></br>
              v0.2.1
            </div>
          </Drawer>

        </div>
      </MuiThemeProvider>
    );
  }
}

//export default Main;
export default withAuth(Analytics);
