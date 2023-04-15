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

  // When the user right clicks on a word that matches the regex, the default context menu will be replaced with the custom context menu. The custom context menu will be displayed at the location of the mouse click. The custom context menu will be hidden when the user clicks anywhere on the page. The custom context menu will be bootstrapped with a list of links. The first link will be the default link. The rest of the links will be the links that the user can choose from. The default link will be the first link in the list. The default link will be the link that the user will be redirected to when the user clicks on the link. The default link will be the link that the user will be redirected to when the user presses the enter key. The default link will be the link that the user will be redirected to when the user presses the space key. The default link will open the corresponding URL in a new tab with the selected text set as the query string. The second link will 
document.addEventListener("contextmenu", (e) => {
  const selection = document.getSelection();
  var selectedText = selection.toString().trim();
  const regex = /test/;
  if (regex.test(selectedText)) {
    e.preventDefault();
    const menu = document.querySelector("#custom-menu");
    menu.style.display = "block";
    menu.style.top = `${e.pageY}px`;
    menu.style.left = `${e.pageX}px`;
  }
});

// When the browser loads a webpage, any word on that page that matches the regex will be hyperlinked. The hyperlink will open the corresponding URL in a new tab with the selected text set as the query string.
document.addEventListener("DOMContentLoaded", () => { 
  var KBRegExPattern = /KB\d{7}/i;
  var CALLRegExPattern = /CALL\d{7}/i;
  var CatchAllTicketNumRegExPattern = /[A-Za-z]{2,5}[0-9]{7,9}/g;
  var IPv4RegExPattern = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i;
  var EmailRegExPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  var HostnameRegExPattern = /[A-PR-VX-Z](CO|01|02|03|04|05|06|07|08|09|10|11|EU|AS)[A-Z0-9]{2}[A-CEGJ-PS-XZ]-[A-Z0-9]{7,8}/i;
  var TeleRegExPattern = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/;
  var ENTUserNameRegExPattern = /\b[A-Z][a-z-]{1,15}?[A-Z]{0,3}[A-Z](?:[aA][jJ][iI][dD]-[aA][lL][iI]|[eE][lL][lL]|[hH][iI][tT][eE]-[bB][aA][rR][nN][eE][yY]|[iI][pP]|[A-Za-z](?:[A-Za-z]{3}(?:.[A-Za-z]{5}|[A-Za-z]{2})?)?|[oO][rR]{2}[eE][sS][tT][oO][rR]{2}[eE][sS]{2}){1,15}?(?:[1-9]1\r\n)?\b/;
  const elements = document.querySelectorAll("p, span, div");
  elements.forEach((element) => {
    const text = element.textContent;
    if (KBRegExPattern.test(text)) {
      const replacedText = text.replace(
        KBRegExPattern,
        `<a href="https://gsa.servicenowservices.com/kb_view.do?sysparm_article=${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    }else if (CALLRegExPattern.test(text)) {
      const replacedText = text.replace(
        CALLRegExPattern,
        `<a href="https://gsa.servicenowservices.com/new_call.do?sysparm_query=number=${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    } else if (CatchAllTicketNumRegExPattern.test(text)) {
      const replacedText = text.replace(
        CatchAllTicketNumRegExPattern,
        `<a href="https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number=${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    } else if (IPv4RegExPattern.test(text)) {
      const replacedText = text.replace(
        IPv4RegExPattern,
        `<a href="https://gsa.servicenowservices.com/nav_to.do?uri=sc_cat_item.do?sys_id=${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    } else if (EmailRegExPattern.test(text)) {
      const replacedText = text.replace(
        EmailRegExPattern,
        `<a href="https://gsa.servicenowservices.com/nav_to.do?uri=sc_cat_item.do?sys_id=${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    } else if (HostnameRegExPattern.test(text)) {
      const replacedText = text.replace(
        HostnameRegExPattern,
        `<a href="https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci_computer.do?sysparm_query=name=${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    } else if (ENTUserNameRegExPattern.test(text)) {
      const replacedText = text.replace(
        ENTUserNameRegExPattern,
        `<a href="https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=user_nameLIKE${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    } else if (TeleRegExPattern.test(text)) {
          var cleaned = ("" + text).trim().replace(/\D/g, "");
          var match = cleaned.match(/\d/g);
          if (match) {
            var formattedPhoneNumber = text;
            if (match.length == 11) {
              formattedPhoneNumber = [
                "(",
                match[1],
                match[2],
                match[3],
                ") ",
                match[4],
                match[5],
                match[6],
                "-",
                match[7],
                match[8],
                match[9],
                match[10],
              ].join("");
            } else if (match.length == 10) {
              formattedPhoneNumber = [
                "(",
                match[0],
                match[1],
                match[2],
                ") ",
                match[3],
                match[4],
                match[5],
                "-",
                match[6],
                match[7],
                match[8],
                match[9],
              ].join("");
            } else if (match.length == 7) {
              formattedPhoneNumber = [
                match[0],
                match[1],
                match[2],
                "-",
                match[3],
                match[4],
                match[5],
                match[6],
              ].join("");
            } else {
              console.log(
                text + " is not a valid telephone number."
              );
            }
            console.log(formattedPhoneNumber);
            var encodedSelectedText = encodeURIComponent(formattedPhoneNumber);
            chrome.tabs.create({
              url:
                "https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=phoneLIKE" +
                encodedSelectedText +
                "%5EORmobile_phoneLIKE" +
                encodedSelectedText +
                "%5EORhome_phoneLIKE" +
                encodedSelectedText,
              index: tab.index + 1,
            });
          } else {
            chrome.tabs.create({
              url:
                "https://gsa.servicenowservices.com/$sn_global_search_results.do?sysparm_search=" +
                encodedSelectedText,
              index: tab.index + 1,
            });
          }
      const replacedText = text.replace(
        TeleRegExPattern,
        `<a href="https://gsa.servicenowservices.com/nav_to.do?uri=sc_cat_item.do?sys_id=${text}" target="_blank">${text}</a>`
      );
      element.innerHTML = replacedText;
    };
  });
});