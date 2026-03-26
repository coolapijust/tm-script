// ==UserScript==
// @name         MiMo 直达聊天
// @match        https://aistudio.xiaomimimo.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const target = 'https://aistudio.xiaomimimo.com/#/c';

  function redirect() {
    if (window.location.href !== target) {
      window.location.replace(target);
    }
  }

  // 多时机尝试
  redirect();
  setTimeout(redirect, 100);
  setTimeout(redirect, 500);
  window.addEventListener('load', redirect);
})();
