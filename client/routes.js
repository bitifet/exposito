// client/routes.js
// ================
"use strict";
const routes = [];

module.exports = [
    ['/', require ( "@views/home"), {}],
    ['/users', require ( "@views/blank"), {}],
    [/^\/user\/(\w+)$/, require ( "@views/blank"), {}],
];

