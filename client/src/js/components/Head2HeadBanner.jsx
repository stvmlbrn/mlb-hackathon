import React from 'react';
import PropTypes from 'prop-types';

import Box from './box';

const Head2HeadBanner = ({ pa, pppa, h, bb, k, avg }) => {
  if (isNaN(avg)) {
    avg = '--';
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Box number={pa} title="Plate Appearances" />
        </div>
        <div className="col-md-4">
          <Box number={pppa} title="Pitches / PA" />
        </div>
        <div className="col-md-4">
          <Box number={avg} title="Avg" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Box number={h} title="Hits" />
        </div>
        <div className="col-md-4">
          <Box number={bb} title="Walks" />
        </div>
        <div className="col-md-4">
          <Box number={k} title="Strike Outs" />
        </div>
      </div>
    </div>
  );
};

Head2HeadBanner.propTypes = {
  pa: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  pppa: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  bb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  k: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  avg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Head2HeadBanner;
