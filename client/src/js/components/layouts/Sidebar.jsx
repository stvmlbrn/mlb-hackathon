import React, {Component} from 'react';
import {Link} from 'react-router';

export default class extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="brand">
          <Link to="/">MLB Hackathon</Link>
        </div>

        <div className="sidebar-scroll">
          CH - Changeup<br/>
          CU - Curveball<br/>
        </div>
      </div>
    );
  }
};

