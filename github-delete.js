// ==UserScript==
// @name         GitHub 仓库删除自动填充
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  快速填充Github仓库删除确认
// @author       Gemini
// @match        https://github.com/*/*/settings
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 核心函数：绕过 React 的 setter 拦截，强制更新内部状态
    function setNativeValue(element, value) {
        const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {};
        const prototype = Object.getPrototypeOf(element);
        const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {};

        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else if (valueSetter) {
            valueSetter.call(element, value);
        } else {
            element.value = value;
        }
    }

    const observer = new MutationObserver((mutations) => {
        const inputField = document.querySelector('#verification_field');

        if (inputField && !inputField.dataset.autofilled) {
            const label = document.querySelector(`label[for="${inputField.id}"]`) ||
                          inputField.closest('div').querySelector('label');

            if (label) {
                const match = label.innerText.match(/"([^"]+)"/);
                if (match && match[1]) {
                    const repoName = match[1];

                    // 1. 先聚焦
                    inputField.focus();

                    // 2. 使用深度模拟方式填充值
                    setNativeValue(inputField, repoName);

                    // 3. 连续触发一系列事件，确保框架感知到变化
                    inputField.dispatchEvent(new Event('input', { bubbles: true }));
                    inputField.dispatchEvent(new Event('change', { bubbles: true }));

                    // 4. 甚至可以模拟一个键盘按键结束
                    inputField.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' }));

                    inputField.dataset.autofilled = "true";
                    console.log('🚀 深度模拟填充成功:', repoName);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
