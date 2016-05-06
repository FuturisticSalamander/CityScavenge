import React, { PropTypes } from 'react';

const Header = () => (
  <div>
      <button type="button">Start Game
      <a href="/auth/google"></a></button>
      <span className="user-name">Current User: { this.props.username } </span>
  </div>
);

// Prop validation throws an error if data you receive is invalid
Header.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Header;
