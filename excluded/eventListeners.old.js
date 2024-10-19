// eventListeners.js
const { handleMessage } = require('./utils/utils');

function setupEventListeners() {
    chrome.runtime.onMessage.addListener(handleMessage);

    chrome.runtime.onInstalled.addListener((info) => {
        chrome.contextMenus.create({
            id: 'autoNavTo',
            title: 'Open "%s" in new tab',
            type: 'normal',
            contexts: ['selection'],
        });
    });
}

module.exports = {
    setupEventListeners: setupEventListeners
};