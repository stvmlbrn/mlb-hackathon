import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Axios from 'axios';

import HeadToHead from './HeadToHead';
import PitchSelection from './PitchSelection';
import SituationAnalysis from './SituationAnalysis';
import PlayerBanner from './PlayerBanner';
import PitchMetrics from './PitchMetrics';

import PanelNoControls from '../components/panels/PanelNoControls';

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
    }
  }

  componentDidMount() {
    this.setState({
      pitcherId: this.props.params.id
    }, this.getData);
  }

  getData = () => {
    const { pitcherId, season } = this.state;

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
    this.calculatePitchTotals();
  }

  calculatePitchTotals = () => {
    const { dataset } = this.state;
    const totals = general.pitchSelectionTotals(dataset);

    this.setState({pitchTotals: totals})
  }

  selectSeason = (e) => {
    this.setState({
      season: e.target.value
    }, this.getData);
  }

  render() {
    const { name, pitcherId, season, loading, dataset, pitchTotals } = this.state;
    let dataFound = false;

    if (!loading && dataset.length) {
      dataFound = true;
    }

    return (
      <div>
        {dataFound &&
          <div>
            <PlayerBanner dataset={dataset} pitcherId={pitcherId} name={name}
              selectSeason={this.selectSeason} season={season} />

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
          </div>
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
