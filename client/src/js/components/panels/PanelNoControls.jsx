import React from 'react';
import PropTypes from 'prop-types';

const PanelNoControls = ({ title, children }) => {
  return (
    <div className="panel">
      {title && (
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
      )}
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
};

PanelNoControls.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

PanelNoControls.defaultProps = {
  title: '',
};

export default PanelNoControls;

