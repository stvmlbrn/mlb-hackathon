import React, {Component} from 'react';

import PlayerPhoto from '../components/playerPhoto';
import Box from '../components/box';
import BarChart from '../components/charts/BarChart';

import head2head from '../utils/head2head';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batters: [],
      batterId: '',
      matchupData: [],
      paResults: {},
      pa: 0,
      pppa: 0 //pitches per plate appearance
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

    this.setState({
      matchupData: matchupData,
      paResults: paResults,
      pa: pa,
      pppa: pppa
    });
  }

  render() {
    var {batters, batterId, matchupData, paResults, pa, pppa} = this.state;

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
            <PlayerPhoto playerId={batterId} height="300"/>
          }
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4"><Box number={matchupData.length} title="Total Pitches"/></div>
            <div className="col-md-4"><Box number={pa} title="Plate Appearances"/></div>
            <div className="col-md-4"><Box number={pppa} title="Pitches / PA"/></div>
          </div>
          <div className="row">
            <div className="col-md-3"><Box number={paResults.avg} title="Avg"/></div>
            <div className="col-md-3"><Box number={paResults.h} title="Hits"/></div>
            <div className="col-md-3"><Box number={paResults.bb} title="Walks"/></div>
            <div className="col-md-3"><Box number={paResults.k} title="Strike Outs"/></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <BarChart height={300}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
