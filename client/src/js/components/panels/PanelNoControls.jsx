import React from 'react';
import PropTypes from 'prop-types';

function PanelNoControls(props) {
  const { title, children } = props;
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
}

PanelNoControls.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

PanelNoControls.defaultProps = {
  title: '',
};

export default PanelNoControls;

