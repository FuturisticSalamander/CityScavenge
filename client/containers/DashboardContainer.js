import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { getFinishPoint } from '../actions/map';
import { fetchCurrentUser, createGame } from '../actions/index';
import { updateUserWithGoogle } from '../actions/user';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendGameInformation: () => {
      createGame(dispatch);
    },
    createFinishPoint: () => {
      getFinishPoint(dispatch);
    },
    fetchUser: () => {
      fetchCurrentUser(dispatch, function(data) {
        dispatch(updateUserWithGoogle(data));
      });
    },
  };
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;



