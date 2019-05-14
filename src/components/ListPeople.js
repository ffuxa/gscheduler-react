import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from "../actions/people";
import { updateName } from "../actions/people";
import bootbox from 'bootbox';

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
      callback: name => {
        if (name !== null) {
          this.props.updateName(index, name)
        }
      }
    });
  }

  render() {
    return (
      <div>
        <h3>People</h3>
        <br/><br/>
        { this.props.people.length === 0 &&
          <h5 className="center">No people have been added yet!</h5>
        }
        { this.props.people.length > 0 &&
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
                  {person.name}  <i onClick={() => this.editMember(index)} className="fas fa-edit clickable"/>
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
          <button className="btn btn-primary" onClick={this.addPerson}>Add</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.people.people,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addPerson: (name) => dispatch(addPerson(name)),
    updateName: (index, newName) => dispatch(updateName(index, newName))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPeople);

// TODO: Decide if we're gonna use this technique to apply styles or use a .css file
const styles = {
  tableData: {
    verticalAlign: 'middle'
  },
};
