import React from 'react';
//import './Login.css';
import AuthService from './AuthService';
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
import Img from 'react-image';

const style = {
    margin: 12,
    center: {
        textAlign: 'center',
        paddingTop: '15%',
    },
    title: {
        textAlign: 'center',
        margin: 0,
    },
    top: {
        textAlign: 'center',
        paddingTop: 0,
        marginTop: 0,
    },
    LogoStyle: {
        margin: 0,
        height: 200,
        position: 'center',
        paddingTop: -50,        
    }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Login extends React.Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();

        this.state = {
            username: '',
            password: '',
        };
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={style.center} >
                    <AppBarFacts style={style.top}/>
                    <Img style={style.LogoStyle} src="http://realmikefacts.com:8080/imgMikeHash" />
                    <h1 style={style.title}>Login to #realMikeFacts</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        
                        <TextField
                            hintText="Username"
                            errorText=""
                            floatingLabelText="Enter super secret username"
                            value={this.state.username}
                            onChange={this.handleUserNameChange}
                        /><br/>
                        <TextField
                            hintText="Password"
                            type="password"
                            errorText=""
                            floatingLabelText="Enter MEGA secret password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        /><br />
                        <RaisedButton 
                            style={style.button}
                            type="submit" 
                            label="Login" 
                            secondary={true} 
                            style={style} 
                        />
                    </form>
                    <Foot />
                </div>
            </MuiThemeProvider>
        )

    }
    handleUserNameChange = (e) => {
        this.setState({
        username: e.target.value,
        });
    }
    handlePasswordChange = (e) => {
        this.setState({
        password: e.target.value,
        });
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
}

export default Login;