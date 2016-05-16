import { connect } from 'react-redux';
import TopAppBar from '../components/TopAppBar';
import { toggleNav } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    name: state.currentUser.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggle: () => {
      dispatch(toggleNav());
    },
  };
};

const VisibleTopAppBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopAppBar);

export default VisibleTopAppBar;
