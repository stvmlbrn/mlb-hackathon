import React from 'react';
import PropTypes from 'prop-types';

import PlayerPhoto from '../components/playerPhoto';
import PanelNoControls from '../components/panels/PanelNoControls';
import Box from '../components/box';

function PlayerBanner(props) {
  const { data, pitcherId, name, selectSeason, season } = props;

  return (
    <PanelNoControls>
      <div className="row">
        <div className="col-md-3">
          <div className="media">
            <div className="media-left">
              <PlayerPhoto playerId={pitcherId} height="125" />
            </div>
            <div className="media-body">
              <h3>{name}</h3>
              <select name="season" className="form-control" onChange={selectSeason} value={season}>
                <option value="2016">Season: 2016</option>
                <option value="2015">Season: 2015</option>
                <option value="2014">Season: 2014</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <Box number={data.appearances} title="Appearances" icon="fa fa-video-camera" />
        </div>
        <div className="col-md-3">
          <Box number={data.totalPitches} title="Total Pitches" icon="fa fa-line-chart" />
        </div>
        <div className="col-md-3">
          <Box number={data.avgPitchCount} title="Avg Pitch Count" icon="fa fa-bars" />
        </div>
      </div>
    </PanelNoControls>
  );
}

PlayerBanner.propTypes = {
  data: PropTypes.object.isRequired,
  pitcherId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selectSeason: PropTypes.func.isRequired,
  season: PropTypes.number.isRequired,
};

export default PlayerBanner;
