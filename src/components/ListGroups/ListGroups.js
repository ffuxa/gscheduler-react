import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import './ListGroups.css';
import NewGroup from "./NewGroup/NewGroup";
import Loading from "../Loading/Loading";
import bootbox from 'bootbox';
import * as _ from 'underscore';

import {
  startAddingGroup,
  deleteGroup,
  deleteMemberFromGroup,
  addMemberToGroup
} from "../../actions/group";

class ListGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups_new_member: [],
      prevGroupLength: 0
    };

    this.addGroup = this.addGroup.bind(this);
    this.promptDeleteGroup = this.promptDeleteGroup.bind(this);
    this.promptDeleteMember = this.promptDeleteMember.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    /*
      This method checks if the number of groups has changed in the redux state, and adds a "new member"
      field to the state if it has increased.

      NOTE: This may have a bug if the group size decreases, which should be fixed later!
    */

    if (props.groups && props.groups.length > state.prevGroupLength) {
      return {
        groups_new_member: _.range(props.groups.length).map(function () {
          return {
            newMember: {
              name: '',
              isSongLeader: false
            },
            isAddingNewMember: false
          };
        }),
        prevGroupLength: props.groups.length
      }
    }

    return null;
  }

  addGroup() {
    this.props.addGroup();
  }

  promptDeleteGroup(index) {
    let group = this.props.groups[index];

    bootbox.confirm(
      `Are you sure you wish to delete the group <b>${group.name}</b>`,
      (result) => {
        if (result) {
          this.props.deleteGroup(group)
        }
      })
  }

  promptDeleteMember(member_index, group_index) {
    let member = this.props.groups[group_index].members[member_index];
    let group = this.props.groups[group_index];

    bootbox.confirm(
      `Are you sure you wish to delete the member 
      <b>${member.name}</b> from the group 
      <b>${group.name}</b>`,
      (result) => {
        if (result) {
          this.props.deleteMemberFromGroup(member, group)
        }
      })
  }

  // "Adding a new member" methods below

  promptNewMember(group_index) {
    this.setState(prevState => {
      return {
        groups_new_member: prevState.groups_new_member.map((item, index) => {
          return index === group_index ? {
            newMember: {
              name: '',
              isSongLeader: false,
              id: ''
            },
            isAddingNewMember: true
          } : item
        })
      }
    })
  }

  handleNewMemberNameChange(e, group_index) {
    // Create a copy of the state array to avoid mutating the state directly
    let groups_new_member = [...this.state.groups_new_member];
    groups_new_member[group_index].newMember.name = e.target.value;
    groups_new_member[group_index].newMember.id = e.target[e.target.selectedIndex].getAttribute('id');

    this.setState({ groups_new_member });
  }

  handleNewMemberSongLeaderChange(e, group_index) {
    // Create a copy of the state array to avoid mutating the state directly
    let groups_new_member = [...this.state.groups_new_member];
    groups_new_member[group_index].newMember.isSongLeader = !groups_new_member[group_index].newMember.isSongLeader;
    this.setState({ groups_new_member });
  }

  cancelAddingMember(group_index) {
    this.setState(prevState => {
      return {
        groups_new_member: prevState.groups_new_member.map((item, index) => {
          return index === group_index ? {...item, isAddingNewMember: false} : item
        })
      }
    })
  }

  addNewMemberToGroup(group_index) {
    let group = this.props.groups[group_index];
    this.props.addMemberToGroup({...this.state.groups_new_member[group_index].newMember}, group);
    this.cancelAddingMember(group_index);
  }

  availablePeople(group_index) {
    // Returns the people that haven't been chosen already as a member or song leader
    // Prevents "double adding" of a member
    let members = this.props.groups[group_index].members;

    // Check if people is defined first, since people might not be loaded from firestore immediately...
    return this.props.people !== undefined ? this.props.people.filter(el => {
      return members.map(a => a.name).indexOf(el.name) === -1
    }) : [];
  }

  render() {
    const { groups } = this.props;

    if (groups !== undefined) {
      return (
        <div>
          <h3>Groups</h3>
          {this.props.groups.length === 0 && !this.props.addingGroup &&
          <div>
            <br/><br/>
            <h5 className="center">No groups have been added yet!</h5>
          </div>
          }
          {!this.props.addingGroup &&
          <div className="center">
            <br/><br/>
            <button className="btn btn-primary" onClick={this.addGroup}>Add Group</button>
          </div>
          }

          {/* New Group */}
          {this.props.addingGroup && <div><br/><NewGroup/></div>}

          <div className="container">
            <div className="row">
              {
                this.props.groups.map((group, group_index) =>
                  <div className="col group-container" key={group_index}>
                    {/* Group Name */}
                    <h1 className="center">{group.name}</h1>
                    <br/>

                    {/* Hours Practiced */}
                    <div className="space-between">
                      <h5>Hours Practiced</h5>
                      <span>15</span>
                    </div>

                    {/* Members */}
                    <div>
                      <h5>Members</h5>
                      {
                        group.members.map((member, mem_index) =>
                          <div className="members-container space-between" key={mem_index}>
                            <p>{member.name} {member.isSongLeader &&
                            <i className="fas fa-star"/>}</p>
                            <i onClick={() => this.promptDeleteMember(mem_index, group_index)}
                               className="fas fa-trash clickable"/>
                          </div>
                        )
                      }
                      {/* Add New Member */}
                      {this.state.groups_new_member[group_index].isAddingNewMember &&
                      <div className="form-group row new-member-container">
                        <div className="col-sm-10">
                          <div className="row">
                            <label htmlFor="memberName"
                                   className="col-sm-3 col-form-label">Name:</label>
                            <div className="col-sm-9">
                              <select className="form-control" id="memberName"
                                      value={this.state.groups_new_member[group_index].newMember.name}
                                      onChange={e => this.handleNewMemberNameChange(e, group_index)}>
                                <option value="Choose person...">Choose person...</option>
                                {this.availablePeople(group_index).map((person, p_index) =>
                                  <option key={p_index} value={person.name} id={person.id}>{person.name}</option>
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <label htmlFor="memberName" className="col-form-label">Song
                            Leader:</label>
                          <input id="color" type="checkbox"
                                 value={this.state.groups_new_member[group_index].newMember.isSongLeader}
                                 onChange={e => this.handleNewMemberSongLeaderChange(e, group_index)}/>
                        </div>

                        <button className="btn btn-warning"
                                onClick={() => this.cancelAddingMember(group_index)}>Cancel
                        </button>
                        <button className="btn btn-primary"
                                onClick={() => this.addNewMemberToGroup(group_index)}>Add
                        </button>
                      </div>
                      }
                    </div>

                    <div className="center">
                      {!this.state.groups_new_member[group_index].isAddingNewMember &&
                      <div>
                        <button className="btn btn-primary"
                                onClick={() => this.promptNewMember(group_index)}>Add Member
                        </button>
                        <br/><br/>
                      </div>
                      }
                      <button onClick={() => this.promptDeleteGroup(group_index)}
                              className="btn btn-danger">Delete Group
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      );
    }
    else {
      return <Loading/>;
    }
  }
}

const mapStateToProps = state => {
  return {
    groups: state.firestore.ordered.groups,
    people: state.firestore.ordered.people,     // Load people directly from firestore
    addingGroup: state.group.addingGroup,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addGroup: () => dispatch(startAddingGroup()),
    deleteGroup: group => dispatch(deleteGroup(group)),
    deleteMemberFromGroup: (member, group) => dispatch(deleteMemberFromGroup(member, group)),
    addMemberToGroup: (newMember, group) => dispatch(addMemberToGroup(newMember, group)),
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['people', 'groups'])
)(ListGroups);
