import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import Login from './Login'; // Custom react login component
import fingerScanner from './fingerScanner'; // Fun fingerPrint scanner idea!
import AboutUs from './AboutUs';
import Analytics from "./analytics";
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<Router>
        <div>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signUp" component={fingerScanner} />
            <Route path="/LitTweets" component={Analytics} />
            <Route path="/AboutMe" component={AboutUs} />
            <Route path="/.well-known" component={AboutUs} />
      </div>
    </Router>, document.getElementById('app'));
