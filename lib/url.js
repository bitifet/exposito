// lib/url.js
// ==========

const Url = require('url');

const _url_ = {};

Object.entries(Url).map(
    ([k, f]) => _url_[k] = f.bind(Url)
);

_url_.parseSearchStr = function parseUrlSearch(searchStr) {
    if ((searchStr || "").length <= 1) return {};
    return JSON.parse(
        '{"'
        + decodeURI(
            searchStr.substring(1)
        )
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g,'":"')
        + '"}'
    );
};

module.exports = _url_;
