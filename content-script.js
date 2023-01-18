/* jshint moz:true */
/* jshint esversion: 6*/
// @ts-nocheck

/*document.addEventListener('selectionchange', function() {
  var selection = window.getSelection().toString().trim();
  console.log(`Selection: ${selection}`);
  chrome.runtime.sendMessage({
    request: "updateContextMenu",
    selection: selection
  })});

  function notifyBackgroundPage(e) {
    const sending = chrome.runtime.sendMessage({
      message: selection,
    });
    sending;
  }
  
  window.addEventListener("click", notifyBackgroundPage);
  
  Here's a content script that sends a message to the background script when the user clicks the content window. The message payload is {greeting: "Greeting from the content script"}, and the sender also expects to get a response, which is handled in the handleResponse function:

// content-script.js

function handleResponse(message) {
  console.log(`Message from the background script: ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  const sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script",
  });
  sending.then(handleResponse, handleError);
}

window.addEventListener("click", notifyBackgroundPage);
Copy to Clipboard
The corresponding background script looks like this:

// background-script.js
function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.greeting}`);
  sendResponse({ response: "Response from background script" });
}

browser.runtime.onMessage.addListener(handleMessage);
Copy to Clipboard
Note: Instead of using sendResponse(), returning a Promise is the recommended approach for Firefox add-ons. Examples using a Promise are available in the examples section of the runtime.onMessage listener.


  
  */
/* https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage#examples*/

function handleResponse(message) {
  console.log(`Message from the background script: ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  var selection = window.getSelection().toString().trim();
  console.log(`Selection: ${selection}`);
  if (selection && selection !== null && selection !== undefined) {
    JSON.stringify(selection);
    console.log(`Selection: ${selection}`);
    const sending = chrome.runtime.sendMessage({
      messagePayload: selection,
    });
  sending.then(handleResponse, handleError);
}};

window.addEventListener("selectionchange", notifyBackgroundPage);


/*chrome.commands.onCommand.addListener((command) => {
  if (command == 'autoSearch'){
    chrome.runtime.sendMessage({
      request: "autoSearch"
  })}});


chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  url = url.replace("https://gsa.servicenowservices.com", "https://gsa.servicenowservices.com/nav_to.do?uri=");
  chrome.tabs.create({
    url: url, index: tab.index + 1
  })})
  */