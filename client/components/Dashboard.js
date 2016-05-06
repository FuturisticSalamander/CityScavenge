import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';
import LeftNav from 'material-ui/lib/left-nav';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
// import injectTapEventPlugin from 'react-tap-event-plugin/src/injectTapEventPlugin';
// injectTapEventPlugin();


const colors = styles.Colors;

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({ open: false });
  }


  render() {
    return (
      <div>
        <LeftNav docked={false} width={200} open={this.state.open} onRequestChange={open => this.setState({ open })}>
          <MenuItem onClick={this.handleToggle}>Logout</MenuItem>
        </LeftNav>
        <AppBar title="City Hunt" iconClassNameRight="muidocs-icon-navigation-expand-more" onClick={this.handleToggle} onLeftIconButtonTouchTap={() => console.log('YO YO YO')} />
        <div className="dash-jumbotron">
          <Avatar style={{ display: 'block', margin: '0 auto' }} color={colors.deepOrange300} backgroundColor={colors.purple500} size={150}>W</Avatar>
        </div>
        <Tabs>
          <Tab onClick={() => { alert(' TESTING'); }} label="Old Games" >
            <div>
              <Card>
                <CardHeader
                  title="Retro Pub Hunt"
                  subtitle="A stroll around SF's coolest retro pubs"
                  avatar="http://lorempixel.com/100/100/nature/"
                />
                <CardMedia
                  overlay={<CardTitle title="Ricky's Bar" subtitle="5th and Folsom" />}
                >
                  <img src="http://cdn.partyearth.com/photos/842716c040ac94a9187c2d969db6bb03/toronado_s345x230.jpg?1375037264" />
                </CardMedia>
              </Card>
              <Card>
                <CardHeader
                  title="Retro Pub Hunt"
                  subtitle="A stroll around SF's coolest retro pubs"
                  avatar="http://lorempixel.com/100/100/nature/"
                />
                <CardMedia
                  overlay={<CardTitle title="Ricky's Bar" subtitle="5th and Folsom" />}
                >
                  <img src="http://cdn.partyearth.com/photos/842716c040ac94a9187c2d969db6bb03/toronado_s345x230.jpg?1375037264" />
                </CardMedia>
              </Card>
            </div>
          </Tab>
          <Tab label="Current Games" >
            <div>
              <h2>Currently Available Games</h2>
              <p>Here we can put a whole list of games that are available to begin playing.</p>
            </div>
          </Tab>
          <Tab label="Stats" >
            <div>
              <h2>Tab Three</h2>
              <p>
                Here was can have a table with icons of all the stats. w00t w00t
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    currentMap: state.currentMap,
    username: state.currentUser.username,
    userImage: state.currentUser.image,
  };
}

export function mapDispatchToProps(state) {
  return {
  };
}

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

