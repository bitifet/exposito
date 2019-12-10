// lib/url.js
// ==========

module.exports = {
    parseUrlSearch(searchStr) {//{{{
        if (searchStr.length <= 1) return {};
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
    },//}}}
};
