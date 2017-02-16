import React from 'react';

function SituationForm(props) {
  var {onSubmit, onChange, onRunnerChange, criteria} = props;

  return (
    <form className="form-horizontal" onSubmit={onSubmit}>
      <div className="form-group">
        <label className="col-sm-3 control-label">Balls</label>
        <div className="col-sm-9">
          <select name="balls" className="form-control" onChange={onChange} value={criteria.balls}>
            <option value="any">Any</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="" className="col-sm-3 control-label">Strikes</label>
        <div className="col-sm-9">
          <select name="strikes" className="form-control" onChange={onChange} value={criteria.strikes}>
            <option value="any">Any</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="" className="col-sm-3 control-label">Outs</label>
        <div className="col-sm-9">
          <select name="outs" className="form-control" onChange={onChange} value={criteria.outs}>
            <option value="any">Any</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="" className="col-sm-3 control-label">Runners</label>
        <div className="col-sm-9">
          <label htmlFor="runner1" className="checkbox-inline">
            <input type="checkbox" name="runner1" id="runner1" onChange={onRunnerChange} checked={criteria.runner1}/> 1st
          </label>
          <label htmlFor="runner2" className="checkbox-inline">
            <input type="checkbox" name="runner2" id="runner2" onChange={onRunnerChange} checked={criteria.runner2}/> 2nd
          </label>
          <label htmlFor="runner3" className="checkbox-inline">
            <input type="checkbox" name="runner3" id="runner3" onChange={onRunnerChange} checked={criteria.runner3}/> 3rd
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="" className="col-sm-3 control-label">Inning</label>
        <div className="col-sm-9">
          <select name="inning" className="form-control" onChange={onChange} value={criteria.inning}>
            <option value="any">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="" className="col-sm-3 control-label">Batter</label>
        <div className="col-sm-9">
          <select name="batter" className="form-control" onChange={onChange} value={criteria.batter}>
            <option value="any">Any</option>
            <option value="L">Left</option>
            <option value="R">Right</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-3 col-sm-9">
          <button type="submit" className="btn btn-primary">
            Analyze Situation
          </button>
        </div>
      </div>
    </form>
  );
};

export default SituationForm;
