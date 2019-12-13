// client/views/blank/index.view.js
// ================================

import view_base from '@client/interfaces/view.interface.js';

class blankView extends view_base {
    render(target) {
        target.html("")
    };
};

export default blankView;

