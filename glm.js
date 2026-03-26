// ==UserScript==
// @name         智谱直达聊天
// @match        https://chat.z.ai/*
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';
  const key = 'zai_redirect_done';

  if (window.location.pathname === '/auth') {
    if (sessionStorage.getItem(key)) {
      // 已经跳过一次了，说明是登录态过期，不再跳
      sessionStorage.removeItem(key);
      return;
    }
    sessionStorage.setItem(key, '1');
    window.location.replace('https://chat.z.ai/');
  } else {
    // 非 auth 页面，清除标记
    sessionStorage.removeItem(key);
  }
})();
