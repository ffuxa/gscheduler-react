import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGroup } from "../actions/group";

const initialState = {
  name: '',
  songLeader: "",
  members: [""]
};

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSongLeaderChange = this.handleSongLeaderChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.addMember = this.addMember.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleSongLeaderChange(e) {
    this.setState({songLeader: e.target.value});
  }

  handleMemberChange(index, e) {
    // Create a copy of the state array to avoid mutating the state directly
    let members = [...this.state.members];
    members[index] = e.target.value;
    this.setState({ members });
  }

  addMember(e) {
    e.preventDefault();
    this.setState({ members: [...this.state.members, ""] });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addGroup(this.state);
    this.setState(initialState);
  }

  availableStudents() {
    // Returns the students that havent been chosen already as a member or song leader
    // Prevents "double adding" of a member
    return this.props.students.filter(el => {
      return el !== this.state.songLeader && !this.state.members.includes(el);
    });
  }

  render() {
    return (
      <div>
        <h3>Add a new song</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Song Name:
              <input type="text" value={this.state.name} onChange={this.handleNameChange} />
            </label>
          </div>
          <div>
            <label>
              Song Leader:
              <input id="color" list="song-leader-suggestions" autoComplete="off"
                     value={this.state.songLeader}
                     onChange={this.handleSongLeaderChange}/>
              <datalist id="song-leader-suggestions">
                { this.availableStudents().map((student, index) =>
                  <option key={index} value={student.name} />
                )}
              </datalist>
            </label>
          </div>
          {
            this.state.members.map((member, index) =>
              <div key={index}>
                <label>
                  Member:
                  <input id="color" list="member-suggestions" autoComplete="off"
                         value={member}
                         onChange={(e) => this.handleMemberChange(index, e)}/>
                  <datalist id="member-suggestions">
                    { this.availableStudents().map((student, index) =>
                      <option key={index} value={student.name} />
                    )}
                  </datalist>
                </label>
              </div>
            )
          }
          <button onClick={this.addMember}>Add member</button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.availability.students,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addGroup: newGroup => dispatch(addGroup(newGroup))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);
