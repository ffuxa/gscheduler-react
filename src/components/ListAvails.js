import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListAvails extends Component {
  constructor(props) {
    super(props);

    this.editAvail = this.editAvail.bind(this);
    this.addAvail = this.addAvail.bind(this);
  }

  editAvail() {
    console.log("Edit Avail");
  }

  addAvail() {
    console.log("Add Avail");
  }

  render() {
    return (
      <div>
        <h3>Avails</h3>
        <br/><br/>
        { this.props.avails.length === 0 &&
        <h5 className="center">No avails have been added yet!</h5>
        }
        { this.props.avails.length > 0 &&
        <table className="table">
          <tbody>
          {this.props.avails.map((avail, index) =>
            <tr key={index}>
              <th scope="row" style={styles.tableData}>{index + 1}</th>
              <td style={styles.tableData}>
                {avail.name}  <i onClick={() => this.editAvail(index)} className="fas fa-edit clickable"/>
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
          <button className="btn btn-primary" onClick={this.addAvail}>Add Avail</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avails: state.avails.avails,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // addPerson: (name) => dispatch(addPerson(name)),
    // updateName: (index, newName) => dispatch(updateName(index, newName))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAvails);

// TODO: Decide if we're gonna use this technique to apply styles or use a .css file
const styles = {
  tableData: {
    verticalAlign: 'middle'
  },
};
