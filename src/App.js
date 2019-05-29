import React, { Component } from 'react';
import ListPeople from "./components/ListPeople";
import ListGroups from "./components/ListGroups/ListGroups";
import ListAvails from "./components/ListAvails";
import Sidebar from "./components/Sidebar";

import './App.css';

import { connect } from 'react-redux';
import { getWhenIsGoodAvailability } from "./actions/availability";

class App extends Component {
  // componentWillMount() {
    // this.props.getAvails();
  // }

  render() {
    return (
      <div className="App">
        <Sidebar/>
        { this.props.current_page === "people" &&
          <ListPeople/>
        }
        { this.props.current_page === "groups" &&
          <ListGroups/>
        }
        { this.props.current_page === "avails" &&
          <ListAvails/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avails: state.availability.students,
    current_page: state.sidebar.selected
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAvails: () => dispatch(getWhenIsGoodAvailability())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
