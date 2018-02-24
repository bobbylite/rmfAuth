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
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import AppBarFacts from './appBar';
import Foot from './Foot';
import Img from 'react-image';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
    margin: 12,
    center: {
        textAlign: 'center',
        paddingTop: '15%',
    },
    top: {
      textAlign: 'center',
      paddingTop: 0,
      marginTop: 0,
      zIndex: 10,
    },
    title: {
        textAlign: 'center',
        margin: 0,
    },
    top: {
        textAlign: 'center',
        paddingTop: 0,
        marginTop: 2,
    },
    LogoStyle: {
        marginTop: 10,
        zIndex: 1
    },
    CardStyle: {
        zIndex: 0
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



class AboutUs extends React.Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.Auth = new AuthService();

        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
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

    handleHome = () => {
      this.props.history.replace('/');
    }

    handleLitTweets = () => {
      this.props.history.replace('/LitTweets');
    }

    handleMenuOpen = () => {this.setState({open: !this.state.open})};
    handleMenuClose = () => {this.setState({open: false})};

    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={style.center} >
                    <AppBarFacts style={style.top}/>
                    <FlatButton style={style.menuButton} onClick={this.handleMenuOpen.bind(this)}>
                      <Menu style={style.menuIcon}/>
                    </FlatButton>
                    <Drawer
                      docked={false}
                      width={250}
                      open={this.state.open}
                      onRequestChange={(open) => this.setState({open})}
                    >
                      <AppBarFacts style={style.top}/>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <MenuItem onClick={this.handleHome}>Home</MenuItem>
                      <MenuItem onClick={this.handleLitTweets}>@realMikeFacts 🔥lit tweets</MenuItem>
                      <MenuItem onClick={this.handleSignUp}>Create Account</MenuItem>
                      <MenuItem onClick={this.handleClose}>About Us</MenuItem>
                      <div style={style.credits}>
                      <br></br>
                        realMikeFacts.com
                        <br></br>
                        A Bobby Luisi project
                        <br></br>
                        v0.2.1
                      </div>
                    </Drawer>
                    <Card style={style.LogoStyle}>
                        <CardHeader
                        style={style.CardStyle}
                        title="About Us"
                        subtitle="The Developer: Bobby"
                        avatar="https://lh3.googleusercontent.com/-M6xWYF_ISNQ/WURmOOoiOaI/AAAAAAAAAFw/_pr0vRuGPiIwKE9mPDByNGhA5VEqYBtYgCEwYBhgL/w140-h139-p/IMG_1672.JPG"
                        />
                        <CardMedia
                        style={style.CardStyle}
                        overlay={<CardTitle subtitle="Long Island, NY" />}
                        >
                        <img style={style.CardStyle} src="https://raw.githubusercontent.com/bobby3501/ConsiliTechSolutions/master/views/img/OpenOcean2.jpg" alt="" />
                        </CardMedia>
                        <CardTitle style={style.CardStyle} title="#realMikeFacts" subtitle="Who am I? Why did I create it?" />
                        <CardText>
                        I am an avid surfer, musician, and photographer.  I work professionally as a software engineer in 
                        the broadcast media industry.
                        I grew up in Long Island, New York. 
                        </CardText>
                        <CardText>
                        When I was about 14 I fell in love with music, specifically the guitar.  I had a couple of different bands and met 
                        many musicians, some 'Genius' musicians along the way. 
                        I love all the greats and I have plenty of that oozy bluesy soul. Influences: Jimi Hendrix, Led Zeppelin, 
                        Frank Zappa, Eric Clapton, Tony Iommi, Alan Holdsworth, Jeff Beck, Alex Lifeson.. to name a few.
                        </CardText>
                        <CardText>
                        I wanted to learn how these fantastic electrical circuits 
                        could make such loud, booming and completely beautiful sounds!  So, I had to learn electronics.  
                        I started modifying amplifiers and guitars to emulate the sounds I heard on my favorite albums. 
                        Example: Edgar Winter & Rick Derringer Live in Japan.  (My b.c rich bich guitar)
                        </CardText>
                        <CardText>
                        I ended up going to school for Electrical and Computer Engineering. I loved digital design, something
                        about my brain handles literal logic really well. I also wrote lots of code, and had to take a bunch 
                        of stupid classes like public speaking. #fdale. 
                        </CardText>
                        <CardText>
                        I ended up in a really 'funny' place when I got hired full time as a Team Lead in a non-engineering department. 
                        Where was the engineering?  I had to look for it.
                        Someone from the engineering department actually noticed I was making some nifty Node.js apps, and 
                        some mobile apps.
                        He ended up asking me if I had ever used
                        React.js or React-Native.
                        </CardText>
                        <CardText>
                        realMikeFacts started out as a test to see if I could teach myself React. Just hopped into that crazy fun 
                        JavaScript community.  
                        </CardText>
                        <CardText>
                        Mike works at starbucks... But at night he is a vigilante black hat hacker.  Things got interesting
                        when he began egging me on to 'up the security' and started pointing out 'vulns' as he calls them.
                        This made me want to be a better developer.  It became something fun to talk about. Which lead me to be
                        the life of every party. 😎
                        </CardText>
                        <CardText>
                        So, about the app!  The front end is all Reactjs.  I used Google's 'Material Design' libraries in my components.
                        Using JSX is really quick and easy.  For state management I'm using React router.  The back end is really interesting.
                        I used the Express Node.js framework for a server applicaiton. I created a realMikeFacts twitter application so that 
                        the realMikeFacts back end can use the Twitter API.  
                         I also wrote a realMikeFacts REST API for this server application 
                        but the fun part was learning how to write it asynchroneously.  So, the React front end is using 
                        The realMikeFacts back end REST API to manage multiple JSON databases while sending tweets through
                        the UI. 
                        </CardText>
                        <CardText>
                        So, I will continue to slowly improve the performance, security and scalability of the applicaiton.  But
                        Not because I like ripping on Mike, or because I like twitter.  It's genuinely because 
                        coding and learning to code has been, and will always be one of the many things I love to do!
                        This is really just the aftermath of someone asking me a simple question about something I'm passionate about.
                        </CardText>
                        <CardText>
                        PS: Thanks for making me finally create this Felicia! 😉
                        </CardText>
                        <CardActions>
                            {/*<FlatButton label="Action1" />
                        <FlatButton label="Action2" /> */}
                        </CardActions>
                    </Card>
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
              console.log("test")
              if(JSON.stringify(res.sucess) == 'false'){
                this.setState({
                  username: '',
                  password: '',
                  usernameError: 'Come on... Get it right this time.',
                  passwordError: 'You can do it!'
                })
              }
              if(JSON.stringify(res.sucess) == 'true'){
                this.props.history.replace('/');
              }
            })
            .catch(err =>{
                alert(err);
            })
    }
    componentWillMount(){
    }
}

export default AboutUs;
