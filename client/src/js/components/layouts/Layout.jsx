import React, {Component} from 'react';


import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {location} = this.props;
    return (
      <div id="wrapper">
        <Sidebar />
        <div className="main">
          <Header />
          <div className="main-content">
            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
