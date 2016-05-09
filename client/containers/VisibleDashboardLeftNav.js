import { connect } from 'react-redux';
import DashboardLeftNav from '../components/DashboardLeftNav';
import { toggleNav, logout } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    visible: state.leftNav.visible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggle: () => {
      dispatch(toggleNav());
      dispatch(logout());
    },
  };
};

const VisibleDashboardLeftNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardLeftNav);

export default VisibleDashboardLeftNav;
