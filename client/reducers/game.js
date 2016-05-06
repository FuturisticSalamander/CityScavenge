const initialState = {
  endLat: 0,
  endLng: 0,
  userLat: 0,
  userLng: 0,
  collision: false,
  map: 0,
  userMarker: 0,
  endMarker: 0,
};

const game = (state = initialState, action) => {
  switch (action.type) {
    // the below is used for testing
    // Do not delete
    case 'CHANGE_USER_NAME':
      return Object.assign({}, state, {
        username: action.username,
      });
    default:
      return state;
  }
};

export default game;
