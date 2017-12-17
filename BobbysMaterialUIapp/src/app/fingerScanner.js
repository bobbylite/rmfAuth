import React from 'react';
import Img from 'react-image';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {deepOrange500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

// CSS
const styles = {
    // Test css 
    default : {
        backgroundColor: '#fff',
        position: 'absolute', 
    },
    scanSpot: {
        // Move the scanner location with this.
        // Size the scanner witht this. 
        
    },
    thumbImg: {
        height: 100,
        marginLeft: 100,
        position: 'absolute',
        top: 50,
        left: 35,
        zIndex: -2, // UNDO 
    },
    scanImg: {
        height: 100,
        marginLeft: 100,
        position: 'absolute',
    },
    circle: {
        top: 10,
        left: 110,
        borderRadius: '50%',
        width: 180,
        height: 180, 
        backgroundColor: '#e74c3c',
        position: 'absolute',
    }
}


class FingerScanner extends React.Component{
    // defenitions 
    constructor(props, context) {
        super(props, context);
        this.handleScan = this.handleScan.bind(this);

        this.state = {
            // default application states. 
            value: 0,
        }
    }

    // handles scanning
    handleScan = () => {
        // code changes state of click.
        // state => pressed.\
        let progressVal = 100;
        this.setState = (progressVal) => {value: 100};
    }

    render () { 
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.default}>
            <div style={styles.default}>  
                <Img style={styles.thumbImg} src="http://www.freepngimg.com/download/fingerprint/1-2-fingerprint-free-download-png.png" />
            </div>
            <div style={styles.default}>
                <CircularProgress mode="determinate" value={this.state.value} style={styles.scanImg} size={200} thickness={5} />
            </div>
            <div style={styles.circle} onClick={this.handleScan.bind(this)}>
                <button onClick={this.handleScan.bind(this)}/>
            </div>
        </div>
            </MuiThemeProvider>
        )
    }
}

export default FingerScanner;