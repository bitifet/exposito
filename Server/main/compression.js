// Server/main/compression.js
// ==========================

const compression = require('compression');

module.exports = compression({
    // https://www.npmjs.com/package/compression#options
    filter: shouldCompress,
});

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
};

