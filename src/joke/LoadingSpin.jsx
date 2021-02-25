import React, { Component } from 'react';
import './LoadingSpin.css'
class LoadingSpin extends Component{
  render(){
    return(
      <div className="Loading">
        <i className="fas fa-sync"></i>
      </div>
    );
  }
}

export default LoadingSpin;