import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { addGroup, cancelAddingGroup } from "../../../actions/group";
import "./NewGroup.css";

const initialState = {
  name: '',
  members: []
};

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMemberSongLeaderChange = this.handleMemberSongLeaderChange.bind(this);
    this.handleMemberNameChange = this.handleMemberNameChange.bind(this);
    this.addMember = this.addMember.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleMemberNameChange(index, e) {
    // Create a copy of the state array to avoid mutating the state directly
    let members = [...this.state.members];
    members[index].name = e.target.value;
    members[index].id = e.target[e.target.selectedIndex].getAttribute('id');
    this.setState({ members });
  }

  handleMemberSongLeaderChange(index) {
    // Create a copy of the state array to avoid mutating the state directly
    let members = [...this.state.members];
    members[index].isSongLeader = !members[index].isSongLeader;
    this.setState({ members });
  }

  addMember(e) {
    e.preventDefault();
    this.setState({
      members: [
        ...this.state.members,
        {
          name: "",
          isSongLeader: false,
          id: ""
        }
      ]
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addGroup(this.state);
    this.setState(initialState);
  }

  cancel(e) {
    e.preventDefault();
    this.props.cancelAddingGroup();
    this.setState(initialState);
  }

  availablePeople() {
    // Returns the people that havent been chosen already as a member or song leader
    // Prevents "double adding" of a member

    // Check if people is defined first, since people might not be loaded from firestore immediately...
    return this.props.people !== undefined ? this.props.people.filter(el => {
      return this.state.members.map(a => a.name).indexOf(el.name) === -1
    }) : [];
  }

  removeMember(index) {
    let members_copy = [...this.state.members]; // make a separate copy of the members array
    members_copy.splice(index, 1);
    this.setState({members: members_copy});
  }

  render() {
    return (
      <div className="new-group-container">
        <h3>Add a new group</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="groupName" className="col-sm-2 col-form-label"><strong>Group Name</strong></label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="groupName"
                     value={this.state.name} onChange={this.handleNameChange}/>
            </div>
          </div>
          <p><strong>Members</strong></p>
          <div className="members-container">
            { (this.availablePeople().length > 0 || this.state.members.length > 0) &&
              this.state.members.map((member, m_index) =>
                <div key={m_index} className="form-group row">
                  <div className="col-sm-10">
                    <div className="row">
                      <label htmlFor="memberName" className="col-sm-3 col-form-label">Name:</label>
                      <div className="col-sm-9">
                        <select className="form-control" id="memberName"
                                value={member.name}
                                onChange={(e) => this.handleMemberNameChange(m_index, e)}>
                          <option value="Choose person...">Choose person...</option>
                          { member.name !== "" &&
                            <option value={member.name} id={member.id}>{member.name}</option>
                          }
                          { this.availablePeople().map((person, p_index) =>
                            <option key={p_index} value={person.name} id={person.id}>{person.name}</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <label htmlFor="memberName" className="col-form-label">Song Leader:</label>
                    <input id="color" type="checkbox"
                           value={member.isSongLeader}
                           onChange={() => this.handleMemberSongLeaderChange(m_index)}/>
                    <i onClick={() => this.removeMember(m_index)} className="fas fa-trash clickable"/>
                  </div>
                </div>
              )
            }
            { this.availablePeople().length === 0 && this.state.members.length === 0 &&
              <p>There are no people available to add to this group! Please add them in the "People" tab and come back :)</p>
            }
          </div>
          <button className="btn btn-primary" onClick={this.addMember} disabled={this.availablePeople().length === 0}>Add member</button>
          <br/>
          <br/>
          <button className="btn btn-warning" onClick={this.cancel}>Cancel</button>
          <input className="btn btn-success" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.firestore.ordered.people,     // Load people directly from firestore
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addGroup: newGroup => dispatch(addGroup(newGroup)),
    cancelAddingGroup: () => dispatch(cancelAddingGroup()),
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['people'])
)(NewGroup);