// client/main/main.js
// ===================
"use strict";

import './styles.scss';
import $ from 'jquery';
import mainModel from '../../models/main.js';
import clientRouter from './clientRouter.js';



import layoutTpl from './layout.pug';
import mainTpl from './main.pug';


// Setup layout:
const body = $("body");
const layoutHtml = layoutTpl(mainModel);
body.html(layoutHtml);

// Launch Router:
const app = $("#app");
const Router = clientRouter(app, 'main');
const mainHtml = mainTpl(mainModel);
const main = Router.load('main', mainHtml)

