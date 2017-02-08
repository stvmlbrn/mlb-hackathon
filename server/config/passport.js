'use strict';

var appRoot = require('app-root-path');
var WindowsStrategy = require('passport-windowsauth');

var ldapConfig = {
  url: process.env.LDAP_URL,
  base: process.env.LDAP_BASE,
  bindDN: process.env.LDAP_BIND_DN,
  bindCredentials: process.env.LDAP_BIND_CREDENTIALS
};

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._json.extensionAttribute1);
  });

  passport.deserializeUser(function(id, done) {
    //define the query here to deserialize the user
  });

  passport.use(new WindowsStrategy({
    ldap: ldapConfig,
    integrated: false
  }, function(profile, done) {
    done(null, profile);
  }));

};
