import React from 'react';
import PanelNoControls from './panels/PanelNoControls';
import Box from './box';

function PlayerBanner(props) {
  var {data, pitcherId, name} = props;
  return (
    <PanelNoControls>
      <div className="row">
        <div className="col-md-3">
          <div className="media">
            <div className="media-left">
              <img src={`http://mlb.mlb.com/mlb/images/players/head_shot/${pitcherId}.jpg`} className="media-object" height="100" />
            </div>
            <div className="media-body">
              <h3>{name}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <Box number={data.appearances} title="Appearances"/>
        </div>
        <div className="col-md-3">
          <Box number={data.totalPitches} title="Total Pitches"/>
        </div>
        <div className="col-md-3">
          <Box number={data.avgPitchCount} title="Avg Pitch Count"/>
        </div>
      </div>
    </PanelNoControls>
  );
}

export default PlayerBanner;
