import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { toggleSidebar, selectSidebarItem } from "../actions/sidebar";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onSelect = (selected) => {
    this.props.selectSidebarItem(selected);
  };

  onToggle = (isOpen) => {
    this.props.toggleSidebar(isOpen);
  };

  render() {
    return (
      <div>
        <SideNav onSelect={this.onSelect} onToggle={this.onToggle}>
          <Toggle />

          {this.props.isOpen &&
            <p style={styles.navTitle}>
              gScheduler
            </p>
          }

          <Nav defaultSelected="people">
            {/* People */}
            <NavItem eventKey="people">
              <NavIcon>
                <i className="fas fa-user" style={styles.icon} />
              </NavIcon>
              <NavText style={styles.text}>
                People
              </NavText>
            </NavItem>

            {/* Groups */}
            <NavItem eventKey="groups">
              <NavIcon>
                <i className="fas fa-users" style={styles.icon} />
              </NavIcon>
              <NavText style={styles.text}>
                Groups
              </NavText>
            </NavItem>

            {/* Avails */}
            <NavItem eventKey="avails">
              <NavIcon>
                <i className="fas fa-clock" style={styles.icon} />
              </NavIcon>
              <NavText style={styles.text}>
                Avails
              </NavText>
            </NavItem>

            {/* Generate Schedules */}
            <NavItem eventKey="generate-schedules">
              <NavIcon>
                <i className="fas fa-sync" style={styles.icon} />
              </NavIcon>
              <NavText style={styles.text}>
                Schedule Generator
              </NavText>
            </NavItem>

            {/* Past Schedules */}
            <NavItem eventKey="past-schedules">
              <NavIcon>
                <i className="fas fa-backward" style={styles.icon} />
              </NavIcon>
              <NavText style={styles.text}>
                Past Schedules
              </NavText>
            </NavItem>

            <hr/>

            {/* View Source (Github) */}
            <NavItem eventKey="view-source">
              <NavIcon>
                <i className="fab fa-github" style={styles.icon} />
              </NavIcon>
              <NavText style={styles.text}>
                View Source
              </NavText>
            </NavItem>
          </Nav>
        </SideNav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.sidebar.selected,
    isOpen: state.sidebar.isOpen,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: (isOpen) => dispatch(toggleSidebar(isOpen)),
    selectSidebarItem: (selected) => dispatch(selectSidebarItem(selected))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

// TODO: Decide if we're gonna use this technique to apply styles or use a .css file
const styles = {
  icon: {
    fontSize: '1.75em',
    verticalAlign: 'middle'
  },
  text: {
    fontSize: '1.25em'
  },
  navTitle: {
    fontSize: '1.5em',
    lineHeight: '60px',
    color: 'white',
    fontWeight: 'bold'
  }
};
