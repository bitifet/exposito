// Client/main/main.js
// ===================

import {app} from './layout';
import {parseUrlSearch} from '@lib/url.js';

const path = window.location.pathname;
const args = parseUrlSearch(window.location.search);
const hash = window.location.hash;

export default new Promise(async function(resolve, reject) {

    const router = await (
        await require('@client/router')
    );

    router.go(path, args, hash);

});

