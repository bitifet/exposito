// client/main/main.js
// ===================
"use strict";

import './styles.scss';
import $ from 'jquery';
import tpl from './main.pug';

const html = tpl({
    title: "Webpack Playground",
});
const body = $("body");

body.html(html);
