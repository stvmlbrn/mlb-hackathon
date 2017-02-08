import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import axios from 'axios';

import auth from '../auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      buttonClass: classNames('btn btn-primary btn-lg btn-block'),
      error: false
    };
  }

  onChange = (e) => {
    var state = this.state;

    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  login = (e) => {
    e.preventDefault();

    var {loading, username, password} = this.state;
    loading = true;
    this.setState({loading, error: false});

    auth.login(username, password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({
          username: '',
          password: '',
          loading: false,
          error: true
        });
      }

      var {location} = this.props;

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname);
      } else {
        this.props.router.replace('/');
      }

    });
  }

  render() {
    var {username, password, buttonClass, loading, error} = this.state;
    var icon = classNames(loading ? 'fa fa-spin fa-spinner' : 'fa fa-sign-in');

    buttonClass = classNames(buttonClass, {disabled: loading});

    return (
      <div id="wrapper">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle">
            <div className="auth-box ">
              <div className="left">
                <div className="content">
                  <div className="logo text-center"><img src={require('../../img/acps_logo.jpg')} alt="ACPS Logo"/></div>
                  <form className="form-auth-small" method='post'  onSubmit={this.login}>
                    <div className="form-group">
                      <label htmlFor="signup-email" className="control-label sr-only">Email</label>
                      <input type="text" className="form-control" id="signup-email"
                        value={username} name="username" placeholder="Username" onChange={this.onChange} autoFocus />
                    </div>
                    <div className="form-group">
                      <label htmlFor="signup-password" className="control-label sr-only">Password</label>
                      <input type="password" className="form-control" id="signup-password"
                      value={password} name="password" onChange={this.onChange} placeholder="Password"/>
                    </div>
                    <button type="submit" className={buttonClass}><i className={icon}></i> LOGIN</button>
                    {error && (
                      <div className="alert alert-danger">
                        <strong>Login failed.</strong> You either entered the wrong username/password
                        or you do not have access to this application.
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="right">
                <div className="overlay"></div>
                <div className="content text">
                  <h1 className="heading">Music Instrument Inventory</h1>
                  {/* <p>Unauthorized access is prohibited</p> */}
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Login);
