import React, { Component } from 'react';
import Axios from 'axios';

import SearchResults from '../components/SearchResults';
import PanelNoControls from '../components/panels/PanelNoControls';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      searching: true,
    };
  }

  componentDidMount() {
    if (this.props.location.query.name) {
      this.search();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searching: true }, this.search);
  }


  search() {
    const playerLName = this.props.location.query.name;

    Axios.get(`/player?name=${playerLName}`)
      .then(result => this.setState({ players: result.data, searching: false }));
  }

  render() {
    const { players, searching } = this.state;

    if (searching) {
      return (
        <div>
          <i className="fa fa-spinner fa-spin" /> Searching pitchers...
        </div>
      );
    }

    if (!players.length) {
      return (
        <PanelNoControls>No matching pitchers were found...</PanelNoControls>
      );
    }

    return (
      <div className="row">
        {players.map((p) => {
          return (
            <div key={p.pitcherId} className="col-md-4 col-sm-6 col-xs-12">
              <SearchResults key={p.pitcherId} player={p} />
            </div>
          );
        })}
      </div>
    );
  }
}
