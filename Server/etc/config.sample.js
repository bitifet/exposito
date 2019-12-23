const Path = require("path");
const {name, cfgFile} = require("@models/app.js");
module.exports = (
/* @@yaml@@ */
`# ${name.toUpperCase()} configuration file
# (Sample Cofiguration File)
# Path: ${cfgFile}
#
# NOTE: All sections can be moved to a separate file with the same name and
# '.yaml' extension. In that case, they MUST be removed here.
---
  useDefaults: false
  www:
    address: "0.0.0.0"
    protocols:
      http: 1080
      # https: 1443
      # h2: 1443
  db:
    exposito:
      type: "postgresql"
      connect: "host.example.com:port/dbName"
      user: "userName"
      password: "super_secret_password"
  map:
    defaultCenter: {lat: 39.4803544, lng: 2.6489125}
    defaultZoom: 9
    searchBoundaries:
        north: 40.24981720376913
        west: 0.8801136718750513
        south: 38.59503140102086
        east: 4.802232812500051
  env:
    production:
      # All parameters defined here will (recursively) override previously
      # defined ones if NODE_ENV matches.
    development:
      # ...
`
/* @@/yaml@@ */
);

