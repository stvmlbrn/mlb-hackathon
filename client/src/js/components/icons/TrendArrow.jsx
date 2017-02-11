import React from 'react';

function TrendArrow(props) {
  var {trend} = props;

  if (trend == 'up') {
    return (
      <i className="fa fa-arrow-circle-up text-success"></i>
    );
  } else {
    return (
      <i className="fa fa-arrow-circle-down text-danger"></i>
    );
  }
};

export default TrendArrow;
