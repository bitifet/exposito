// Client/main/main.js
// ===================

import {app} from './layout';

export default new Promise(async function(resolve, reject) {

    const router = await (
        await require('@client/router')
    );

    router.go(window.location.toString());

});

