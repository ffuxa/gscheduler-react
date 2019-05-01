import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListGroups extends Component {
  render() {
    return (
      <div>
        <h3>Songs</h3>
        {
          this.props.groups.map((group, index) =>
            <div key={index}>
              <div>Name: {group.name}</div>
              <div>Song Leader: {group.songLeader}</div>
              <div>
                Members:
                { group.members.map(member =>
                  <span key={member}> {member},</span>
                )}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.group.groups,
  }
};

export default connect(mapStateToProps, null)(ListGroups);
