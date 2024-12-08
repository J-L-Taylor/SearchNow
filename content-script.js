/* jshint moz:true */
/* jshint esversion: 6*/

function handleResponse(message) {
  alert(`Message from the background script: ${message.response}`);
}

function handleError(error) {
  alert(`Error: ${error}`);
}

function notifyBackgroundPage() {
  const selection = document.getSelection();
  if (selection && selection.type === "Range") {
    const selectedText = selection.toString().trim();
      chrome.runtime.sendMessage({ greeting: selectedText })
        .then(handleResponse)
        .catch(handleError);
    }
}

document.addEventListener("selectionchange", notifyBackgroundPage);