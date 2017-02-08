import React from 'react';

import PanelNoControls from './panels/PanelNoControls';

function SelectSeasonForm(props) {
  var {onChange, season} = props;

  return (
    <PanelNoControls>
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="season">Selected Season</label>
          <select name="season" className="form-control"
            onChange={onChange} value={season}>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
          </select>
        </div>
      </form>
    </PanelNoControls>
  );
}

export default SelectSeasonForm;
