import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlayerPhoto from '../components/playerPhoto';
import PanelNoControls from '../components/panels/PanelNoControls';
import Box from '../components/box';

import banner from '../utils/banner';

class PlayerBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appearances: 0,
      totalPitches: 0,
      avgPitchCount: 0,
    };
  }

  componentDidMount() {
    this.calculateBannerData();
  }

  calculateBannerData = () => {
    const { dataset } = this.props;
    const appearances = banner.appearances(dataset);
    const avgPitchCount = banner.avgPitchCount(appearances, dataset.length).toLocaleString();

    this.setState({
      appearances: appearances,
      avgPitchCount: avgPitchCount,
      totalPitches: dataset.length.toLocaleString(),
    });
  }

  render() {
    const { pitcherId, name, selectSeason, season } = this.props;
    const { appearances, avgPitchCount, totalPitches } = this.state;

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
            <Box number={appearances} title="Appearances" icon="fa fa-video-camera" />
          </div>
          <div className="col-md-3">
            <Box number={totalPitches} title="Total Pitches" icon="fa fa-line-chart" />
          </div>
          <div className="col-md-3">
            <Box number={avgPitchCount} title="Avg Pitch Count" icon="fa fa-bars" />
          </div>
        </div>
      </PanelNoControls>
    );
  }
}

PlayerBanner.propTypes = {
  dataset: PropTypes.array.isRequired,
  pitcherId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  selectSeason: PropTypes.func.isRequired,
  season: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default PlayerBanner;
