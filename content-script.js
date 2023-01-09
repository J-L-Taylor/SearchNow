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
  
  window.addEventListener("click", notifyBackgroundPage);*/
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