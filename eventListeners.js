// eventListeners.js
function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${request.greeting}`);
    sendResponse({ response: `${request.greeting}` });
}

export function setupEventListeners() {
    chrome.runtime.onMessage.addListener(handleMessage);
}