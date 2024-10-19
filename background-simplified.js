import { autoNav } from './handlers/autoNav.js';
import { autoSearch } from './handlers/autoSearch.js';

/* jshint esversion: 6*/

// Create context menu entries
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'autoNav',
        title: 'Open "%s"',
        contexts: ['selection']
    });

    chrome.contextMenus.create({
        id: 'autoSearch',
        title: 'Search ServiceNow for "%s"',
        contexts: ['selection']
    });
});

// Handle context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'autoNav') {
        autoNav(info, tab);
    } else if (info.menuItemId === 'autoSearch') {
        autoSearch(info, tab);
    }
});