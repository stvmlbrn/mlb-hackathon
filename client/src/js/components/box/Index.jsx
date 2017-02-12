import React from 'react';

function Box(props) {
  var {number, title, icon} = props;
  return (
    <div className="metric">
      {icon &&
        <span className="icon"><i className={icon}></i></span>
      }
      <p>
        <span className="number">{number}</span>
        <span className="title">{title}</span>
      </p>
    </div>
  )
};

export default Box;
