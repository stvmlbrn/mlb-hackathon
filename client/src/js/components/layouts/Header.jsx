import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLName: ''
    };
  }

  onChange = (e) => {
    this.setState({playerLName: e.target.value});
  }

  search = (e) => {
    if (e) e.preventDefault();

    var {router} = this.props;
    var {playerLName} = this.state;

    if (playerLName.length) {
      router.push(`/search?name=${playerLName}`);
    } else {
      router.push('/search');
    }
  }

  render() {
    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-btn">
						<button type="button" className="btn-toggle-fullwidth"><i className="lnr lnr-arrow-left-circle"></i></button>
					</div>
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu">
							<span className="sr-only">Toggle Navigation</span>
							<i className="fa fa-bars icon-nav"></i>
						</button>
					</div>
					<div id="navbar-menu" className="navbar-collapse collapse">
            <form className="navbar-form navbar-left hidden-xs" onSubmit={this.search}>
							<div className="input-group">
								<input type="text" value="" className="form-control" placeholder="Search pitchers..."
                  value={this.state.playerLName} onChange={this.onChange}/>
								<span className="input-group-btn">
                  <button type="button" type="submit" className="btn btn-primary">Go</button>
                </span>
							</div>
						</form>
					</div>
        </div>
      </div>
    );
  }
};

export default withRouter(Header);


