// client/models/index.js
// ======================

import {getJson} from '@lib/net';

export default Promise.resolve().then(async function() {

    const models = await getJson('/models.json');

    return models;

});
