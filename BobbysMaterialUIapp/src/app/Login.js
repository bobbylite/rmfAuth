import React from 'react';
import AppBar from 'material-ui/AppBar';
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
        paddingLeft: 0,
        marginLeft: 0,
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
        this.handleSignUp = this.handleSignUp.bind(this);
        this.Auth = new AuthService();

        this.state = {
            username: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false

        };
    }

    handleSignUp = () => {
      //Auth.logout()
      this.props.history.replace('/signUP');
    };

    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={style.center} >
                    <AppBarFacts style={style.top}/>
                    <Img style={style.LogoStyle} src="http://realmikefacts.com:8080/imgMikeHash" />
                    <h1 style={style.title}>Login to #realMikeFacts</h1>
                    <form onSubmit={this.handleFormSubmit}>

                        <TextField
                            hintText=""
                            errorText=""
                            floatingLabelText="Enter super secret username"
                            value={this.state.username}
                            onChange={this.handleUserNameChange}
                        /><br/>
                        <TextField
                            hintText=""
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
                            disabled={!this.state.formValid}
                            secondary={true}
                            style={style}
                        />
                    </form>
                    <FlatButton style={{position: 'center', opacity: 1, paddingBottom: 0, marginBottom: '30%', bottom: '10%', left: '25%', right: '25%'}} label="Sign Up Here" onClick={this.handleSignUp.bind(this)} primary={true}/>
                    <Foot />
                </div>
            </MuiThemeProvider>
        )

    }
    validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
        case 'username':
        // create custom regex string.
        emailValid = value.match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
        case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
        default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                    }, this.validateForm);

    }

    validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    handleUserNameChange = (e) => {
        const name = 'username';
        const value = e.target.value;
        this.setState({
            [name]: value},
                        () => { this.validateField(name, value) });

    }
    handlePasswordChange = (e) => {
        const name = 'password';
        const value = e.target.value;
        this.setState({
            [name]: value},
                        () => { this.validateField(name, value) });
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
