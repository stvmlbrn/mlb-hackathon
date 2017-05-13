import React from 'react';
import PropTypes from 'prop-types';

const PlayerPhoto = ({ playerId, height }) => {
  return (
    <img
      src={`http://mlb.mlb.com/mlb/images/players/head_shot/${playerId}.jpg`}
      className="media-object"
      height={height}
      alt="Player Head Shot"
    />
  );
};

PlayerPhoto.propTypes = {
  playerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default PlayerPhoto;
