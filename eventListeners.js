// eventListeners.js
function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${request.greeting}`);
    sendResponse({ response: `${request.greeting}` });
}

export function setupEventListeners() {
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