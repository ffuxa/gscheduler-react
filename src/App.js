import React, { Component } from 'react';
import NewGroup from "./components/NewGroup";
import ListStudents from "./components/ListStudents";
import ListGroups from "./components/ListGroups";

import './App.css';

import { connect } from 'react-redux';
import { getWhenIsGoodAvailability } from "./actions/availability";

class App extends Component {
  componentWillMount() {
    this.props.getAvails();
  }

  render() {
    return (
      <div className="App">
        <ListStudents/>
        <NewGroup/>
        <ListGroups/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avails: state.availability.students,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAvails: () => dispatch(getWhenIsGoodAvailability())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
