import React, {Component} from 'react';

import PlayerPhoto from '../components/playerPhoto';
import StackedBarChart from '../components/charts/StackedBarChart';
import Head2HeadBanner from '../components/Head2HeadBanner';
import SituationAnalysisResults from '../components/SituationAnalysisResults';

import head2head from '../utils/head2head';
import general from '../utils/general';
import selection from '../utils/selection';

export default class extends Component {
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
    var {dataset, pitcherId} = this.props;
    var batters = head2head.getBatters(dataset, pitcherId);

    this.setState({batters: batters});
  }

  selectBatter = (e) => {
    this.setState({
      batterId: e.target.value
    }, this.getMatchupData);
  }

  getMatchupData = () => {
    var {pitcherId, dataset} = this.props;
    var {batterId} = this.state;
    var matchupData = head2head.getMatchupData(dataset, pitcherId, batterId);
    var pa = head2head.countPlateAppearances(matchupData);
    var paResults = head2head.paResults(matchupData);
    var pppa = (matchupData.length / pa).toFixed(1);
    var pitchSelectionTotals = general.pitchSelectionTotals(matchupData);
    var pitchSelectionTrend = head2head.pitchSelectionTrend(matchupData);

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
    var {batters, batterId, matchupData, paResults, pa, pppa, totalPitches, pitchSelectionTotals, pitchSelectionTrend} = this.state;
    var {pitchTotals} = this.props;

    return (
      <div className="row">
        <div className="col-md-3 text-center">
          <select name="batterId" className="form-control" value={batterId} onChange={this.selectBatter}>
            <option value="">-- Select Batter --</option>
            {batters.map(b => {
              return (
                <option key={b.batterId} value={b.batterId}>{b.batter}</option>
              );
            })}
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
