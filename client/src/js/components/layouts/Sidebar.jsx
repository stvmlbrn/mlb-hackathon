import React, {Component} from 'react';
import {Link} from 'react-router';

export default class extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="brand">
          <Link to="/"><h4 className="text-center">TruMedia<br/>MLB Hackathon</h4></Link>
        </div>

        <div>
          <h4 className="text-center">Pitch Reference</h4>
          <ul>
            <li>CH - Changeup</li>
            <li>CU - Curveball</li>
            <li>EP - Eephus</li>
            <li>FA - Fastball</li>
            <li>FC - Cutter</li>
            <li>FF - Four Seamer</li>
            <li>FO - Forkball</li>
            <li>FS - Splitter</li>
            <li>FT - Two Seamer</li>
            <li>GY - Gyroball</li>
            <li>KC - Knuckle Curve</li>
            <li>KN - Knuckleball</li>
            <li>SC - Screwball</li>
            <li>SI - Sinker</li>
            <li>SL - Slider</li>
          </ul>
        </div>
      </div>
    );
  }
};

