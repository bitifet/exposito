// client/routes.js
// ================

module.exports = Promise.resolve().then(async function(){

    const routes =  [];

    routes.push (['/', await require ("@views/home"), {}]);
    routes.push (['/users', await require ("@views/blank"), {}]);
    routes.push ([/^\/user\/(\w+)$/, await require ("@views/blank"), {}]);

    return routes;

});
