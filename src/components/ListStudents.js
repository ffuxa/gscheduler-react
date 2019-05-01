import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListStudents extends Component {
  render() {
    return (
      <div>
        <h3>Groove ppl</h3>
        {
          this.props.students.map((student, index) =>
            <div key={index}>{student.name}</div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.availability.students,
  }
};

export default connect(mapStateToProps, null)(ListStudents);
