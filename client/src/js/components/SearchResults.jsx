import React from 'react';
import {Link} from 'react-router';

import PanelNoControls from './panels/PanelNoControls';

function SearchResults(props) {
  var {player} = props;
  var imageURL = `http://mlb.mlb.com/mlb/images/players/head_shot/${player.pitcherId}.jpg`;
  var statsLink = `/player/${player.pitcherId}`;

  return (
    <PanelNoControls>
      <div className="media">
        <div className="media-left">
          <img src={imageURL} className="media-object" height="125" />
        </div>
        <div className="media-body">
          <h3>{player.pitcher}</h3>
          <hr/>
            <Link to={statsLink}>
              View Stats <i className="fa fa-chevron-right"></i>
            </Link>
        </div>
      </div>
    </PanelNoControls>
  );
}

export default SearchResults;

