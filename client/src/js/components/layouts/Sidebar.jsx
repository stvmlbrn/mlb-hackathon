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
            <li>FA - Fastball</li>
            <li>FT - Two Seamer</li>
            <li>FF - Four Seamer</li>
            <li>FC - Cutter</li>
            <li>SL - Slider</li>
            <li>FS - Splitter</li>
            <li>SI - Sinker</li>
            <li>FO - Forkball</li>
            <li>KN - Knuckleball</li>
            <li>KC - Knuckle Curve</li>
            <li>SC - Screwball</li>
            <li>GY - Gyroball</li>
            <li>EP - Eephus</li>
            <li>PO - Pitchout</li>
            <li>IN - Intentional Ball</li>
            <li>AB - Automatic Ball</li>
            <li>AS - Automatic Strike</li>
            <li>UN - Unknown</li>
          </ul>
        </div>
      </div>
    );
  }
};

