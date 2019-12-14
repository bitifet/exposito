// client/main/layout.js
// =====================
import $ from 'jquery';
import layoutTpl from './layout.pug';
import mainModel from '@models/main.js';

// Setup layout:
export const body = $("body");
body.html(
    layoutTpl(mainModel)
);

// App container:
export const app = $("#app");

export default null;
