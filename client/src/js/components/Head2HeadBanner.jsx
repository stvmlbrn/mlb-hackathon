import React from 'react';

import Box from './box';

function Head2HeadBanner(props) {
  var {pa, pppa, avg, h, bb, k} = props;

  if (isNaN(avg)) {
    avg = '--';
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4"><Box number={pa} title="Plate Appearances"/></div>
        <div className="col-md-4"><Box number={pppa} title="Pitches / PA"/></div>
        <div className="col-md-4"><Box number={avg} title="Avg"/></div>
      </div>
       <div className="row">
        <div className="col-md-4"><Box number={h} title="Hits"/></div>
        <div className="col-md-4"><Box number={bb} title="Walks"/></div>
        <div className="col-md-4"><Box number={k} title="Strike Outs"/></div>
      </div>
    </div>
  );
};

export default Head2HeadBanner;
