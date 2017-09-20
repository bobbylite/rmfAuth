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
import TextField from 'material-ui/TextField';
import AppBarFacts from './appBar';
import Foot from './Foot';
import AuthService from './AuthService';
import withAuth from './withAuth';

const Auth = new AuthService();

const styleAction = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
};

const styles = {
  bottom: {
    margin: 0,
    bottom: 1,
    position: 'fixed',
  },
  top: {
    textAlign: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  center: {
    textAlign: 'center',
  },
  share: {
    margin: 0,
    bottom: -50, 
    textAlign: 'center',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose2 = this.handleRequestClose2.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleTouchTap2 = this.handleTouchTap2.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    
    this.state = {
      open2: false,
      tweetValue: '',
    };
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
    // Twitter API data goes here! 
    // Must build seperate NodeJS server that /GET a /POST with JSON data string in it. 
    // see config.js for Twitter App key and secrets.


    // Also add Login page that does a "swipe from right" like you're clicking on a menu except ALL the way 
    // makes it apear like a new page was loaded in and THAT is this main page.  All done through setSTATE.

    // AND setSTATE on when you hit "Close" after the tweet is sent that clears the textField
  }

    handleLogout = () => {
      Auth.logout()
      this.props.history.replace('/login');
    };

  request = () => {

    fetch('http://96.232.94.109:8080/Message/' + this.state.tweetValue, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: 'Hello username',
        second: 'Hello password',
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

    var text;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.center} >
          <AppBarFacts style={styles.top}/>
          <Dialog
            open={this.state.open2}
            title="Almost there..."
            actions={standardActions2}
            onRequestClose={this.handleRequestClose2}
          >
          <p>@RealMikeFacts   {this.state.tweetValue} #realmikefacts</p>
          </Dialog>
          <h1 style={styles.container}> #RealMikeFacts</h1>
          <h3>Send a Mike Fact!</h3>
          <TextField
            hintText="Fact About Mike"
            value={this.state.tweetValue}
            onChange={this.handleTextFieldChange}
            multiLine={true}
          /><br/>
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
          <AppBarFacts style={styles.styleAction}/>
          <FloatingActionButton style={styleAction}
            onTouchTap={this.handleTouchTap2}
          >
          <Share />
          </FloatingActionButton>
          <Foot />
        </div>
      </MuiThemeProvider>
    );
  }
}

//export default Main;
export default withAuth(Main);
