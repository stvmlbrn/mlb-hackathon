import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import TrendArrow from './icons/TrendArrow';

const SituationAnalysisResults = ({ totalPitches, pitchTotals, analysis }) => {
  if (totalPitches > 0) {
    return (
      <div>
        <h3>Total Pitches: {totalPitches}</h3>
        <table className="table table-bordered table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th></th>
              <th colSpan="3" >Situation</th>
              <th colSpan="3" className="active">Overall</th>
            </tr>
            <tr>
              <th>Type</th>
              <th>Pitch Total</th>
              <th >%</th>
              <th >K %</th>
              <th className="active">Pitch Total</th>
              <th className="active">%</th>
              <th className="active">K %</th>
            </tr>
          </thead>
          <tbody>
            {analysis.map(a => {
              var overall = _.find(pitchTotals, (p) => p.pitch == a.pitch); //match pitch type with the overall dataset.
              var percentTrend = parseFloat(a.percentage) > parseFloat(overall.percentage) ? 'up' : 'down';
              var strikeTrend = parseFloat(a.strikePercentage) > parseFloat(overall.strikePercentage) ? 'up' : 'down';
              return (
                <tr key={a.pitch}>
                  <td>{a.pitch}</td>
                  <td>{a.count}</td>
                  <td >{a.percentage} <TrendArrow trend={percentTrend}/></td>
                  <td>{a.strikePercentage} <TrendArrow trend={strikeTrend}/></td>
                  <td className="active">{overall.count}</td>
                  <td className="active">{overall.percentage}</td>
                  <td className="active">{overall.strikePercentage}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7">
                <TrendArrow trend="up"/> More likely to be thrown in the given situation compared to pitcher's overall average.<br/>
                <TrendArrow trend="down"/> Less likely to be thrown in the given situation compared to pitcher's overall average.
              </td>
            </tr>
          </tfoot>
        </table>

        <ul>
          <li>
            <strong>%</strong> - Percentange the pitch was thrown in the select situation and the pitcher's
            overall dataset.
          </li>
          <li>
            <strong>K %</strong> - Percentage the pitch was thrown for a strike in the selected situation
            and the pitcher's overall dataset.
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>No data could be found matching your selected situation filter</div>
  );
};

SituationAnalysisResults.propTypes = {
  totalPitches: PropTypes.number.isRequired,
  pitchTotals: PropTypes.array.isRequired,
  analysis: PropTypes.array.isRequired,
};

export default SituationAnalysisResults;
