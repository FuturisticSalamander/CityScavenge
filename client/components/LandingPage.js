import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const LandingPage = () => (
  <div className="landing-container">
    <h3 className="app-title">City Hunt</h3>
    <span>Explore your city</span>
    <div className="button-group">
      <RaisedButton label="Login with Google" primary={true} />
    </div>
  </div>
);

export default LandingPage;
