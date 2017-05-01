import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlayerPhoto from '../components/playerPhoto';
import StackedBarChart from '../components/charts/StackedBarChart';
import Head2HeadBanner from '../components/Head2HeadBanner';
import SituationAnalysisResults from '../components/SituationAnalysisResults';

import head2head from '../utils/head2head';
import general from '../utils/general';
import selection from '../utils/selection';

class HeadToHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batters: [],
      batterId: '',
      matchupData: [],
      paResults: {},
      totalPitches: 0,
      pa: 0,
      pppa: 0, //pitches per plate appearance
      pitchSelectionTotals: [],
      pitchSelectionTrend: [] //how pitch selection against batter changes as game progresses
    };
  }

  componentDidMount() {
    const { dataset, pitcherId } = this.props;
    const batters = head2head.getBatters(dataset, pitcherId);

    this.setState({batters: batters});
  }

  selectBatter = (e) => {
    this.setState({
      batterId: e.target.value
    }, this.getMatchupData);
  }

  getMatchupData = () => {
    const { pitcherId, dataset } = this.props;
    const {batterId} = this.state;
    const matchupData = head2head.getMatchupData(dataset, pitcherId, batterId);
    const pa = head2head.countPlateAppearances(matchupData);
    const paResults = head2head.paResults(matchupData);
    const pppa = (matchupData.length / pa).toFixed(1);
    const pitchSelectionTotals = general.pitchSelectionTotals(matchupData);
    const pitchSelectionTrend = head2head.pitchSelectionTrend(matchupData);

    this.setState({
      matchupData: matchupData,
      paResults: paResults,
      pa: pa,
      pppa: pppa,
      totalPitches: matchupData.length,
      pitchSelectionTotals: pitchSelectionTotals,
      pitchSelectionTrend: pitchSelectionTrend
    });
  }

  render() {
    const { batters, batterId, matchupData, paResults, pa, pppa, totalPitches, pitchSelectionTotals, pitchSelectionTrend } = this.state;
    const { pitchTotals } = this.props;

    return (
      <div className="row">
        <div className="col-md-3 text-center">
          <select name="batterId" className="form-control" value={batterId} onChange={this.selectBatter}>
            <option value="">-- Select Batter --</option>
            {batters.map((b) => <option key={b.batterId} value={b.batterId}>{b.batter}</option>)}
          </select>
          <br/>
          {(batterId !== '') &&
            <PlayerPhoto playerId={batterId} height={300}/>
          }
        </div>
        <div className="col-md-9">
          {(pa > 0) &&
            <div>
              <Head2HeadBanner pa={pa} pppa={pppa} avg={paResults.avg}
                h={paResults.h} bb={paResults.bb} k={paResults.k}/>

              <div className="well well-sm">
                <SituationAnalysisResults totalPitches={totalPitches} pitchTotals={pitchTotals} analysis={pitchSelectionTotals} />
              </div>

              <StackedBarChart height={400} data={pitchSelectionTrend} />
              <div className="text-center">
                <em>
                Shows how the pitch selection (as a percentage) changes against the selected batter as the game progresses.
                </em>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
};

HeadToHead.propTypes = {
  pitcherId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  dataset: PropTypes.array.isRequired,
  pitchTotals: PropTypes.array.isRequired,
};

export default HeadToHead;
