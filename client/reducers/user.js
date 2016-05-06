const initialState = {
  username: 'Alexander',
};

const user = (state = initialState, action) => {
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

export default user;
