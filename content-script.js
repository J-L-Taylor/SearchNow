/* jshint moz:true */
/* jshint esversion: 6*/
// @ts-nocheck

function handleResponse(message) {
  alert(`Message from the background script: ${message.response}`);
}

function handleError(error) {
  alert(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  var selection;
  var selectedText;
  selection = document.getSelection();
  if (selection && selection.type === "Range") {
    selectedText = selection.toString().trim();
    const sending = chrome.runtime.sendMessage({
      greeting: selectedText,
    });
    sending.then(handleResponse, handleError);
  }
}

document.addEventListener("selectionchange", notifyBackgroundPage);


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