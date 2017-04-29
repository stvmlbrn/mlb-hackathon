import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Sidebar from './Sidebar';

function Layout(props) {
  const { children } = props;

  return (
    <div id="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="main-content">
          <div className="container-fluid">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
