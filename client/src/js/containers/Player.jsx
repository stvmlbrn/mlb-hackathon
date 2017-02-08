import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import Axios from 'axios';

import HeadToHead from './HeadToHead';
import PitchSelection from './PitchSelection';
import PanelNoControls from '../components/panels/PanelNoControls';
import SelectSeasonForm from '../components/SelectSeasonForm';
import PlayerBanner from '../components/PlayerBanner';

import banner from '../utils/banner';
import selection from '../utils/selection';

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
      bannerData: {
        appearances: 0,
        totalPitches: 0,
        avgPitchCount: 0
      },
      pitchSelectionData: {
        overall: []
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
        }, this.calculateBannerData);
      });
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
    this.calculatePitchSelectionData();
  }

  calculatePitchSelectionData = () => {
    var {dataset, pitchSelectionData} = this.state;

    pitchSelectionData.overall = selection.inningBreakdown(dataset);

    this.setState({pitchSelectionData: pitchSelectionData});
  }

  selectSeason = (e) => {
    this.setState({
      season: e.target.value
    }, this.getData);
  }

  render() {
    var {name, bannerData, pitchSelectionData, pitcherId, season} = this.state;

    /* if (!loading && !dataset.length) {
      return (
        <div>No data found. Please select another season.</div>
      )
    } else { */
      return (
        <div>
          <PlayerBanner data={bannerData} pitcherId={pitcherId} name={name} />
          <SelectSeasonForm onChange={this.selectSeason} season={season} />
          <PanelNoControls>
            <Tabs id="controlled-tab-example">
              <Tab eventKey={1} title="Pitch Selection">
                <PitchSelection data={pitchSelectionData} />
              </Tab>
              <Tab eventKey={2} title="Pitch Effectiveness">

              </Tab>
              <Tab eventKey={3} title="Situational Analysis">

              </Tab>
              <Tab eventKey={4} title="Head-To-Head">
                <HeadToHead/>
              </Tab>
            </Tabs>
          </PanelNoControls>
        </div>
      );
    //}
  }
};
