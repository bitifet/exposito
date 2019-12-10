// client/main/main.js
// ===================

import './styles.scss';
import {app} from './layout';
import {go} from '@client/router';
import {parseUrlSearch} from '@lib/url.js';

const path = window.location.pathname;
const args = parseUrlSearch(window.location.search);
const hash = window.location.hash;

go(path, args, hash);
