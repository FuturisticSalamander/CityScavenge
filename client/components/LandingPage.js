import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import styles from 'material-ui/lib/styles';

const LandingPage = () => (
  <div className="main-container">
    <div className="desktop-landing-container">
      <div className="left-text">
        <div className="desktop-title">City Scavenge</div>
        <p className="what-is-cs">A mobile scavenger hunt game where you can explore a city with your friends</p>
        <p className="how-to-play">Check this page out on your phone to play!</p>
      </div>
      <img className="phones" src="../assets/cs-phones.png"></img>
    </div>
    <div className="mobile-landing-container">
      <br></br>
      <br></br>
      <span className="mobile-title">City Scavenge</span>
      <img className="mobile-icon" width="200px" height="200px" src="../assets/icon2.png"></img>
      <div className="mobile-button-container">
        <RaisedButton label="Login with Google" backgroundColor={styles.Colors.pink500} primary={true} linkButton={true} href="/api/v1/auth/google" />
      </div>
    </div>
  </div>
);

export default LandingPage;
