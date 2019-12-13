// client/Views/blank/index.view.js
// ================================

const view_base = require('@client/Interfaces/view.interface.js');

class blankView extends view_base {
    render(target) {
        target.html("")
    };
};

module.exports = blankView;

