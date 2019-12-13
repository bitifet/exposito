// client/Views/blank/index.view.js
// ================================

import view_base from '@client/Interfaces/view.interface.js';

class blankView extends view_base {
    render(target) {
        target.html("")
    };
};

export default blankView;

