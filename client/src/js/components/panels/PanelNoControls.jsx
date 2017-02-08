import React, {PropTypes} from 'react';

function PanelNoControls(props) {
  return (
    <div className="panel">
      {props.title && (
        <div className="panel-heading">
          <h3 className="panel-title">{props.title}</h3>
        </div>
      )}
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  );
};

PanelNoControls.propTypes = {
  title: PropTypes.string
};

export default PanelNoControls;

