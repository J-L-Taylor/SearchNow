// utils/utils.js
function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${request.greeting}`);
    sendResponse({ response: `${request.greeting}` });
}

module.exports = {
    handleMessage: handleMessage
};