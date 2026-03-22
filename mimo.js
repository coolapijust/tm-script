// ==UserScript==
// @name         MiMo 直达聊天
// @match        https://aistudio.xiaomimimo.com/*
// @run-at       document-start
// ==/UserScript==

(function () {
      'use strict';
        if (window.location.hash !== '#/c') {
                window.location.replace('https://aistudio.xiaomimimo.com/#/c');
        }
})();

        }
})