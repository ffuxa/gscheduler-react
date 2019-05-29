import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from "../actions/people";
import { updatePersonName } from "../actions/people";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from 'redux';
import bootbox from 'bootbox';
import Loading from './Loading/Loading';

class ListPeople extends Component {
  constructor(props) {
    super(props);

    this.addPerson = this.addPerson.bind(this);
    this.editMember = this.editMember.bind(this);
  }

  addPerson() {
    bootbox.prompt(
      "Name:",
      (name) => {
        if (name !== null) {
          this.props.addPerson(name)
        }
      }
    );
  }

  editMember(index) {
    let person = this.props.people[index];

    bootbox.prompt({
      size: "small",
      title: "Edit Name:",
      value: person.name,
      callback: newName => {
        if (newName !== null) {
          this.props.updatePersonName(index, newName, person)
        }
      }
    });
  }

  render() {
    const { people } = this.props;

    if (people !== undefined) {
      return (
        <div>
          <h3>People</h3>
          <br/><br/>
          {this.props.people !== undefined && this.props.people.length === 0 &&
          <h5 className="center">No people have been added yet!</h5>
          }
          {this.props.people !== undefined && this.props.people.length > 0 &&
          <table className="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Avails Filled Out</th>
              <th scope="col">Availabiltiy %</th>
            </tr>
            </thead>
            <tbody>
            {this.props.people.map((person, index) =>
              <tr key={index}>
                <th scope="row" style={styles.tableData}>{index + 1}</th>
                <td style={styles.tableData}>
                  {person.name} <i onClick={() => this.editMember(index)}
                                   className="fas fa-edit clickable"/>
                </td>
                <td style={styles.tableData}>N/A</td>
                <td style={styles.tableData}>N/A</td>
              </tr>
            )}
            </tbody>
          </table>
          }
          <br/><br/>
          <div className="center">
            <button className="btn btn-primary" onClick={this.addPerson}>Add Person</button>
          </div>
        </div>
      );
    }
    else {
      return (
        <Loading/>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    people: state.firestore.ordered.people,     // Load people directly from firestore
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addPerson: (name) => dispatch(addPerson(name)),
    updatePersonName: (index, newName, person) => dispatch(updatePersonName(index, newName, person))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['people'])
)(ListPeople);

// TODO: Decide if we're gonna use this technique to apply styles or use a .css file
const styles = {
  tableData: {
    verticalAlign: 'middle'
  },
};
