import React from 'react';
import PropTypes from 'prop-types';

function TrendArrow(props) {
  const { trend } = props;

  if (trend === 'up') {
    return (
      <i className="fa fa-arrow-circle-up text-success" />
    );
  }

  return (
    <i className="fa fa-arrow-circle-down text-danger" />
  );
}

TrendArrow.propTypes = {
  trend: PropTypes.string.isRequired,
};

export default TrendArrow;
