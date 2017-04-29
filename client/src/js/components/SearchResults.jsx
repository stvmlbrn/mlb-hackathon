import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import PanelNoControls from './panels/PanelNoControls';
import PlayerPhoto from './playerPhoto';

function SearchResults(props) {
  const { player } = props;
  const statsLink = `/player/${player.pitcherId}`;

  return (
    <PanelNoControls>
      <div className="media">
        <div className="media-left">
          <PlayerPhoto playerId={player.pitcherId} height="125" />
        </div>
        <div className="media-body">
          <h3>{player.pitcher}</h3>
          <hr />
          <Link to={statsLink}>
            View Stats <i className="fa fa-chevron-right" />
          </Link>
        </div>
      </div>
    </PanelNoControls>
  );
}

SearchResults.propTypes = {
  player: PropTypes.object.isRequired,
};

export default SearchResults;

