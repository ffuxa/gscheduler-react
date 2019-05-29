import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="fully-center">
        {/* HTML Source: https://loading.io/css/ */}
        <div className="lds-default">
          <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
        </div>
      </div>
    );
  }
}

export default Loading;
