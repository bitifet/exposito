// Shims/object.fromEntries.js
// ===========================

// Just in case you need to execute in Node prior to 12.4.0
// Otherwise:
//   - This block can be removed
//   - And 'npm remove --save object.fromentries' executed.
if (!Object.fromEntries) {
    require('object.fromentries').shim();
};
