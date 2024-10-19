// This is a JavaScript file
// You can start writing your code here
// Define the context menu items
const contextMenuItems = [
  {
    id: "search-servicenow",
    title: "Search ServiceNow",
    contexts: ["selection"]
  },
  {
    id: "advanced",
    title: "Advanced",
    contexts: ["selection"]
  },
  {
    id: "placeholder",
    title: "Placeholder",
    contexts: ["selection"]
  }
];

// Create the context menu
chrome.contextMenus.create({
  id: "main",
  title: "My Context Menu",
  contexts: ["selection"]
});

// Add the sections to the context menu
contextMenuItems.forEach(item => {
  chrome.contextMenus.create({
    id: item.id,
    title: item.title,
    parentId: "main",
    contexts: item.contexts
    onclick: (info, tab) => {
      // Open a popup window
    chrome.runtime.sendMessage({ text: info.selectionText });
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 400,
        height: 400
      });
    }
  });
});