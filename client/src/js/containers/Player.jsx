import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import Axios from 'axios';

import HeadToHead from './HeadToHead';
import PitchSelection from './PitchSelection';
import SituationAnalysis from './SituationAnalysis';
import PlayerBanner from './PlayerBanner';
import PitchMetrics from './PitchMetrics';

import PanelNoControls from '../components/panels/PanelNoControls';

import banner from '../utils/banner';
import general from '../utils/general';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pitcherId: '',
      name: '',
      dataset: [],
      loading: true,
      season: 2016,
      appearances: 0,
      avgPitchCount: 0,
      pitchTotals: [],
      bannerData: {
        appearances: 0,
        totalPitches: 0,
        avgPitchCount: 0
      }
    }
  }

  componentDidMount() {
    this.setState({
      pitcherId: this.props.params.id
    }, this.getData);
  }

  getData = () => {
    var {pitcherId, season} = this.state;

    this.setState({loading: true});
    Axios.get(`/player/${pitcherId}/year/${season}`)
      .then(result => {
        this.setState({
          loading: false,
          dataset: result.data,
          name: result.data.length ? result.data[0].pitcher : ''
        }, this.loadInitialStats);
      });
  }

  loadInitialStats = () => {
    this.calculateBannerData();
    this.calculatePitchTotals();
  }

  calculatePitchTotals = () => {
    var {dataset} = this.state;
    var totals = general.pitchSelectionTotals(dataset);

    this.setState({pitchTotals: totals})
  }

  calculateBannerData = () => {
    var {bannerData, dataset} = this.state;
    var appearances = banner.appearances(dataset);
    var avgPitchCount = banner.avgPitchCount(appearances, dataset.length).toLocaleString();

    bannerData = {
      appearances: appearances,
      avgPitchCount: avgPitchCount,
      totalPitches: dataset.length.toLocaleString()
    };

    this.setState({bannerData: bannerData});
  }

  selectSeason = (e) => {
    this.setState({
      season: e.target.value
    }, this.getData);
  }

  render() {
    var {name, bannerData, pitcherId, season, loading, dataset, pitchTotals} = this.state;
    var dataFound = false;

    if (!loading && dataset.length) {
      dataFound = true;
    }

    return (
      <div>
        <PlayerBanner data={bannerData} pitcherId={pitcherId} name={name}
          selectSeason={this.selectSeason} season={season} />
        {dataFound &&
          <PanelNoControls>
            <Tabs id="controlled-tab-example">
              <Tab eventKey={1} title="Pitch Selection">
                <PitchSelection dataset={dataset}/>
              </Tab>
              <Tab eventKey={2} title="Pitch Metrics">
                <PitchMetrics dataset={dataset} />
              </Tab>
              <Tab eventKey={3} title="Situational Analysis">
                <SituationAnalysis dataset={dataset} pitchTotals={pitchTotals} />
              </Tab>
              <Tab eventKey={4} title="Head-To-Head">
                <HeadToHead dataset={dataset} pitcherId={pitcherId} pitchTotals={pitchTotals}/>
              </Tab>
            </Tabs>
          </PanelNoControls>
        }

        {!dataFound && !loading &&
          <PanelNoControls>
            No data found for the selected season...
          </PanelNoControls>
        }
      </div>
    );
  }
};
