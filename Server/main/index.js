// Server/main/index.js
// ====================

(function fromEntries_shim(fromEntries){
    // Just in case you need to execute in Node prior to 12.4.0
    // Otherwise:
    //   - This block can be removed
    //   - And 'npm remove --save object.fromentries' executed.
    if (!Object.fromEntries) {
        fromEntries.shim();
    };
})(require('object.fromentries'));

import "./www.js";

