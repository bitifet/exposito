// Client/pwa/index.js
// ===================

module.exports = new Promise(async function(resolve, reject) {

    const {cachedGetJson} = require('@lib/net');
    const model = (await cachedGetJson('/models.json')).app;

    if('serviceWorker' in navigator) {
        console.log("Registering service worker...");
        navigator.serviceWorker.register(
            ///'/ws.js'
            model.serviceWorkerPath
        )
            .then(function() {
                console.log('Service Worker Registered');
            })
        ;
    };

});
