import { autoNav } from './handlers/autoNav.js';
import { autoSearch } from './handlers/autoSearch.js';

/* jshint esversion: 6*/

// Define regex patterns
const KBRegExPattern = /KB\d{7}/i;
const CALLRegExPattern = /CALL\d{7}/i;
const CatchAllTicketNumRegExPattern = /[A-Za-z]{2,5}[0-9]{7,9}/g;

// Create context menu entries
chrome.runtime.onInstalled.addListener(() => {
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

// Listen for the selectionchange event
document.addEventListener('selectionchange', (info, tab) => {
  const selection = info.selectionText;
  if (selection && selection.type === "Range") {
    const selectedText = selection.toString().trim();
  
    // Remove all context menu entries
//    chrome.contextMenus.removeAll(() => {    });
      // Check the selected text for matches
    if (KBRegExPattern.test(selectedText) || CALLRegExPattern.tes(selectedText) || CatchAllTicketNumRegExPattern.test(selectedText)) {
      // Add context menu entry for autoNav
      chrome.contextMenus.create({
        id: 'autoNav',
        title: 'Open "%s"',
        contexts: ['selection']
      });
    } else {
      // Add context menu entry for autoSearch
      chrome.contextMenus.create({
        id: 'autoSearch',
        title: 'Search ServiceNow for "%s"',
        contexts: ['selection']
      });
    }
  };
  });