import React, {Component} from 'react';
import Axios from 'axios';

import SearchResults from '../components/SearchResults';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLName: '',
      players: [],
      searching: false
    }
  }

  componentDidMount() {
    if (this.props.location.query.name) {
      this.setState({
        playerLName: this.props.location.query.name
      }, this.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    var nextName = nextProps.location.query.name;
    var {playerLName} = this.state;

    if (nextName && (nextName != playerLName)) {
      this.setState({
        playerLName: this.props.location.query.name
      }, this.search);
    } else {
      this.setState({criteria: '', results: [], searching: false});
    }
  }


  search() {
    var {playerLName} = this.state;

    this.setState({searching: true});
    Axios.get(`/player?name=${playerLName}`)
      .then(result => this.setState({players: result.data, searching: false}));
  }

  render() {
    var {players, searching} = this.state;

    if (searching) {
      return (
        <div>
          <i className="fa fa-spinner fa-spin"></i> Search players...
        </div>
      );
    } else {
      return (
        <div className="row">
          {players.map(p => {
            return (
              <div key={p.pitcherId} className="col-md-4 col-sm-6 col-xs-12">
                <SearchResults key={p.pitcherId} player={p}/>
              </div>
            );
          })}
        </div>
      );
    }
  }
};
