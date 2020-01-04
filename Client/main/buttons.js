// Client/main/buttons.js
// ======================

const {primaryButtons} = require('@client/layout');
import $ from 'jquery';

primaryButtons.addClass("main_primaryButtons");
require('./buttons.scss');

export const menuButton = $("<span></span>")
    .addClass("mainButton")
    .text("☰ ")
    .appendTo(primaryButtons)
;


