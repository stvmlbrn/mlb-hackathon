import React from 'react';
import PropTypes from 'prop-types';

const Box = ({ number, title, icon }) => {
  return (
    <div className="metric">
      {icon &&
        <span className="icon"><i className={icon} /></span>
      }
      <p>
        <span className="number">{number}</span>
        <span className="title">{title}</span>
      </p>
    </div>
  );
};

Box.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Box.defaultProps = {
  icon: '',
};

export default Box;
