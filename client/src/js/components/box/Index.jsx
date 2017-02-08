import React from 'react';

function Box(props) {
  var {number, title} = props;
  return (
    <div className="metric">
      <span className="icon"></span>
      <p>
        <span className="number">{number}</span>
        <span className="title">{title}</span>
      </p>
    </div>
  )
};

export default Box;
