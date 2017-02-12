import React from 'react';

function PlayerPhoto(props) {
  var {playerId, height} = props;

  return (
    <img src={`http://mlb.mlb.com/mlb/images/players/head_shot/${playerId}.jpg`} className="media-object" height={height} />
  );
};

export default PlayerPhoto;
