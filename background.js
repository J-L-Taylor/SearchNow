/* eslint-disable no-undef */
/* jshint moz:true */
/* jshint esversion: 6*/
// @ts-nocheck
/*
Logic: 
When selected text is right-clicked and the context menu option is clicked, the selected text is evaluated against 13 regular expressions for a match, and if a match is found, the corresponding URL is opened in a new tab with the selected text set as the query string. If a match is not found, a global search is ran in a new tab with the selected text set as the query string.

Features to add: 
T̶O̶D̶O̶:̶ ̶A̶ᴜ̶ᴛ̶ᴏ̶ᴍ̶ᴀ̶ᴛ̶ɪ̶ᴄ̶ᴀ̶ʟ̶ʟ̶ʏ̶ ̶ʜ̶ʏ̶ᴩ̶ᴇ̶ʀ̶ʟ̶ɪ̶ɴ̶ᴋ̶ ̶ᴀ̶ʟ̶ʟ̶ ̶ᴛ̶ɪ̶ᴄ̶ᴋ̶ᴇ̶ᴛ̶ ̶ɴ̶ᴜ̶ᴍ̶ʙ̶ᴇ̶ʀ̶s̶ ̶ɪ̶ɴ̶ ̶ʙ̶ʀ̶ᴏ̶ᴡ̶s̶ᴇ̶ʀ̶ ̶ᴡ̶ɪ̶ɴ̶ᴅ̶ᴏ̶ᴡ̶
Clipboard integration: 
    Via hotkey - Press hotkey to set input variable equal to newest clipboard entry.
    Via right-click context menu entry - select to set input variable equal to newest clipboard entry.
✓ Specify the search type instead of using the regex autoSearch.
✓ Convert a phone number with any formatting into a format of (###) ###-#### before searching for that phone number.
    myString = myString.replace(searchvalue, replacevalue);
✓ Quick shortcut(s) to SNow homepage
► Make URL this shortcut points to editable via Options.html
*/

var KBRegExPattern = /KB\d{7}/i;
var INCRegExPattern = /INC\d{7}/i;
var RITMRegExPattern = /RITM\d{7}/i;
var STASKRegExPattern = /STASK\d{7}/i;
var REQRegExPattern = /REQ\d{7}/i;
var CALLRegExPattern = /CALL\d{7}/i;
var PRBRegExPattern = /PRB\d{7}/i;
var CHGRegExPattern = /CHG\d{7}/i;
var SECRegExPattern = /SEC\d{7}/i;
var CHATRegExPattern = /CHAT\d{7}/i;
// var BSCREGExPattern = /BSC\d{9}/;
var IPv4RegExPattern = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i;
var EmailRegExPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var HostnameRegExPattern = /[A-PR-VX-Z](CO|01|02|03|04|05|06|07|08|09|10|11|EU|AS)[A-Z0-9]{2}[A-CEGJ-PS-XZ]-[A-Z0-9]{7,8}/i;
var TeleRegExPattern = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/;
var CatchAllTicketNumRegExPattern = /[A-Za-z]{2,5}[0-9]{7,9}/g;

/*var cm_clickHandler = function(clickData, tab) {
    alert('Selected ' + clickData.selectionText + ' in ' + tab.url);
};*/

/*document.addEventListener('selectionchange', () => {
    var selection = window.getSelection().toString().trim();
    if (selection){
        console.log(`Selection: ${selection}`);
        if (KBRegExPattern.test(selection)){
            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({
                  id: 'kbNav',
                  title: 'Open article %s',
                  type: 'normal',
                  contexts: ['selection'],
                }, onCreated); 
        } else if (CALLRegExPattern.test(selection)){
            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({
                  id: 'callNav',
                  title: 'Open call record %s',
                  type: 'normal',
                  contexts: ['selection'],
                }, onCreated); 
        } else if (CatchAllTicketNumRegExPattern.test(selection)){
            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({
                  id: 'ticketNav',
                  title: 'Open ticket %s',
                  type: 'normal',
                  contexts: ['selection'],
                }, onCreated);
        } else if (IPv4RegExPattern.test(selection)){
            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({
                  id: 'ipNav',
                  title: 'Open IP record %s',
                  type: 'normal',
                  contexts: ['selection'],
                }, onCreated);
        }
      }
    })*/

/*chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var contextMenuID = info.menuItemId;
    if (msg.request === 'updateContextMenu') {
      var selectedText = msg.selection;
      if (KBRegExPattern.test(selectedText)) {
        if (selectedText == '') {
            // Remove the context menu entry
            if (contextMenuID != null) {
                chrome.contextMenus.remove(contextMenuID);
                contextMenuID = null; // Invalidate entry now to avoid race conditions
            } // else: No contextmenu ID, so nothing to remove
        } else { // Add/update context menu entry
            var options = {
                title: "Nav to KB",
                // contexts: ['selection'],
                //onclick: cm_clickHandler
            };
            if (contextMenuID != null) {
                chrome.contextMenus.update(contextMenuID, options);
            } else {
                // Create new menu, and remember the ID
                contextMenuID = chrome.contextMenus.create(options);
            }
        }
      } else if (CatchAllTicketNumRegExPattern.test(selectedText)) {
        if (selectedText == '') {
            // Remove the context menu entry
            if (contextMenuID != null) {
                chrome.contextMenus.remove(contextMenuID);
                contextMenuID = null; // Invalidate entry now to avoid race conditions
            } // else: No contextmenu ID, so nothing to remove
        } else { // Add/update context menu entry
            var options = {
                title: "Nav to Ticket",
                // contexts: ['selection'],
                //onclick: cm_clickHandler
            }
            if (contextMenuID != null) {
                chrome.contextMenus.update(contextMenuID, options);
            } else {
                // Create new menu, and remember the ID
                contextMenuID = chrome.contextMenus.create(options);
            }
        }
      } else if (IPv4RegExPattern.test(selectedText)) {
        if (selectedText == '') {
            // Remove the context menu entry
            if (contextMenuID != null) {
                chrome.contextMenus.remove(contextMenuID);
                contextMenuID = null; // Invalidate entry now to avoid race conditions
            } // else: No contextmenu ID, so nothing to remove
        } else { // Add/update context menu entry
            var options = {
                title: "Nav to IPv4 Record",
                // contexts: ['selection'],
                //onclick: cm_clickHandler
            }
            if (contextMenuID != null) {
                chrome.contextMenus.update(contextMenuID, options);
            } else {
                // Create new menu, and remember the ID
                contextMenuID = chrome.contextMenus.create(options);
            }
        }
      } else if (EmailRegExPattern.test(selectedText)) {
        if (selectedText == '') {
            // Remove the context menu entry
            if (contextMenuID != null) {
                chrome.contextMenus.remove(contextMenuID);
                contextMenuID = null; // Invalidate entry now to avoid race conditions
            } // else: No contextmenu ID, so nothing to remove
        } else { // Add/update context menu entry
            var options = {
                title: "Nav to User profile",
                // contexts: ['selection'],
                //onclick: cm_clickHandler
            }
            if (contextMenuID != null) {
                chrome.contextMenus.update(contextMenuID, options);
            } else {
                // Create new menu, and remember the ID
                contextMenuID = chrome.contextMenus.create(options);
            }
        }
      } else if (HostnameRegExPattern.test(selectedText)) {
        if (selectedText == '') {
            // Remove the context menu entry
            if (contextMenuID != null) {
                chrome.contextMenus.remove(contextMenuID);
                contextMenuID = null; // Invalidate entry now to avoid race conditions
            } // else: No contextmenu ID, so nothing to remove
        } else { // Add/update context menu entry
            var options = {
                title: "Nav to Config Item Record",
                // contexts: ['selection'],
                //onclick: cm_clickHandler
            }
            if (contextMenuID != null) {
                chrome.contextMenus.update(contextMenuID, options);
            } else {
                // Create new menu, and remember the ID
                contextMenuID = chrome.contextMenus.create(options);
            }
        }
      }
    }
})*/

function handleMessage(request) {
  //console.log(`A content script sent a message: ${request.message}`);
  //sendResponse({ response: "Response from background script" });
  let selectedText = `${request.messagePayload}`;
  return selectedText;
}

chrome.runtime.onMessage.addListener(handleMessage);

var selectedText = handleMessage();

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: 'autoNavTo',
      title: 'Open "%s" in new tab',
      type: 'normal',
      contexts: ['selection'],
    }, onCreated());
  chrome.contextMenus.create({
      id: 'autoSearch',
      title: 'Search for "%s" in new tab',
      type: 'normal',
      contexts: ['selection'],
    }, onCreated());
  chrome.contextMenus.create({
      id: 'manualSearch',
      title: 'Manual search',
      type: 'normal',
      contexts: ['selection'],
    }, onCreated());
    chrome.contextMenus.create({
        id: 'global',
        title: 'Global',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
      chrome.contextMenus.create({
        id: 'separator',
        type: 'separator',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'kbChild',
        title: 'KB',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());  
    chrome.contextMenus.create({
        id: 'incChild',
        title: 'INC',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'ritmChild',
        title: 'RITM',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'staskChild',
        title: 'STASK',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'reqChild',
        title: 'REQ',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'callChild',
        title: 'CALL',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'prbChild',
        title: 'PRB',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'chgChild',
        title: 'CHG',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'secChild',
        title: 'SEC',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'chatChild',
        title: 'CHAT',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'ipv4Child',
        title: 'IPv4',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'emailChild',
        title: 'Email',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'hostnameChild',
        title: 'Hostname',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
    chrome.contextMenus.create({
        id: 'teleChild',
        title: 'Phone number',
        type: 'normal',
        contexts: ['selection'],
        parentId: "manualSearch"
      }, onCreated());
});

function onCreated() {
    if (chrome.runtime.lastError) {
      console.log(`Error: ${chrome.runtime.lastError}`);
    } else {
      console.log("Item created successfully");
    }
}

function formatPhoneNumber(info) {
  let cleaned = ('' + selectedText).trim().replace(/\D/g, '');
  let match = cleaned.match(/\d/g);
  if (match.length == 11) {
    let formattedPhoneNumber = ['(', match[1], match[2], match[3], ') ', match[4], match[5], match[6], '-', match[7], match[8], match[9], match[10]].join('');
    return formattedPhoneNumber;
  } else if (match.length == 10) {
    let formattedPhoneNumber = ['(', match[0], match[1], match[2], ') ', match[3], match[4], match[5], '-', match[6], match[7], match[8], match[9]].join('');
    return formattedPhoneNumber;
  } else if (match.length == 7) {
    let formattedPhoneNumber = [match[0], match[1], match[2], '-', match[3], match[4], match[5], match[6]].join('');
    return formattedPhoneNumber;
  } else {
    alert(selectedText + ' is not a valid telephone number.');
    }
}

var formattedPhoneNumber = formatPhoneNumber();

function autoSearch(info, tab){
  var encodedSelectedText = encodeURIComponent(selectedText).toString().trim();
  if (KBRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=kb_view.do?sysparm_article='+encodedSelectedText, index: tab.index + 1
      });
  } else if (INCRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=incident.do?sysparm_query=number='+encodedSelectedText, index: tab.index + 1
      });
  } else if (RITMRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sc_req_item.do?sysparm_query=number='+encodedSelectedText, index: tab.index + 1
      });
  } else if (STASKRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sc_task.do?sysparm_query=number='+encodedSelectedText, index: tab.index + 1
      });
  } else if (REQRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sc_request.do?sysparm_query=number='+encodedSelectedText, index: tab.index + 1
      });
  } else if (CALLRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=new_call.do?sysparm_query=number='+encodedSelectedText, index: tab.index + 1
      });
  } else if (PRBRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=problem.do?sysparm_query=number='+encodedSelectedText, index: tab.index + 1
      });
  } else if (CHGRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=change_request.do?sysparm_query=number='+encodedSelectedText, index: tab.index+ 1
      });
  } else if (SECRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=u_security_inc.do?sysparm_query=number='+encodedSelectedText, index: tab.index+ 1
      });
  } else if (CHATRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=chat_queue_entry.do?sysparm_query=number='+encodedSelectedText, index: tabindex + 1
      });
  } else if (IPv4RegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci.do?sysparm_query=ip_address='+EncodedSelectedTex+'%5Esys_class_name%3Dcmdb_ci_computer', index: tab.index + 1
      });
  } else if (EmailRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user_list.do?sysparm_query=emailLIKE'+encodedSelectedText, index: tabindex + 1
      });
  } else if (HostnameRegExPattern.test(selectedText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci_computer_list.do?sysparm_query=nameLIKE'+EncodedSelectedTex+'%5EORasset_tagLIKE'+encodedSelectedText+'%5EORserial_numberLIKE'+encodedSelectedText+'%5EORfqdnLIKE'+EncodedSelectedTex+'%5EORdns_domainLIKE'+encodedSelectedText, index: tab.index + 1
      });
  } else if (TeleRegExPattern.test(selectedText)) {
      formatPhoneNumber(info);
      console.log(formattedPhoneNumber);
      let EncodedSelectedText = encodeURIComponent(formattedPhoneNumber);
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user_list.do?sysparm_query=phoneLIKE'+EncodedSelectedTex+'%5EORmobile_phoneLIKE'+EncodedSelectedText+'%5EORhome_phoneLIKE'+EncodedSelectedText, index: tab.index + 1
      });
  } else {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=$sn_global_search_results.do?sysparm_search='+encodedSelectedText, index: tabindex + 1
      });
  }
}

function autoNav(info, tab){
    var EncodedSelectedText = encodeURIComponent(SelectedText).toString().trim();
    if (KBRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/kb_view.do?sysparm_article='+EncodedSelectedText, index: tab.index + 1
        });
    } else if (CALLRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com//nav_to.do?uri=new_call.do?sysparm_query=number='+EncodedSelectedText, index: tab.index + 1
        });
    } else if (CatchAllTicketNumRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number='+EncodedSelectedText, index: tab.index + 1
        });
    } else if (IPv4RegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci_ip_address.do?sysparm_query=ip_address='+EncodedSelectedText, index: tab.index + 1
        });
    } else if (EmailRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user.do?sysparm_query=email='+EncodedSelectedText, index: tab.index + 1
        });
    } else if (HostnameRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci_computer.do?sysparm_query=name='+EncodedSelectedText, index: tab.index + 1
        });
    } else if (TeleRegExPattern.test(SelectedText)) {
        formatPhoneNumber(info);
        let EncodedSelectedText = encodeURIComponent(formattedPhoneNumber);
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=phoneLIKE'+EncodedSelectedText+'%5EORmobile_phoneLIKE'+EncodedSelectedText+'%5EORhome_phoneLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/$sn_global_search_results.do?sysparm_search='+EncodedSelectedText, index: tab.index + 1
        });
    }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {

    var EncodedSelectedText = encodeURIComponent(info.selectionText).toString();

    switch (info.menuItemId) {
        case "autoNavTo":
            autoNav(info, tab);
        break;
        case "autoSearch":
            autoSearch(info, tab);
        break;
        case "kbChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/$knowledge.do?sysparm_type_filter=all&sysparm_order=relevancy&query='+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "incChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/incident_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "ritmChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sc_req_item_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "staskChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sc_task_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "reqChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sc_request_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "callChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/new_call_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "prbChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/problem_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "chgChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/change_request_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "secChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/u_security_inc_list.do?sysparm_query=123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "chatChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/chat_queue_entry_list.do?sysparm_query=%5EGOTO123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "ipv4Child":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/cmdb_ci_list.do?sysparm_query=ip_addressLIKE'+EncodedSelectedText+'%5Esys_class_name%3Dcmdb_ci_computer', index: tab.index + 1
            });
        break;
        case "emailChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=emailLIKE'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "hostnameChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/cmdb_ci_computer_list.do?sysparm_query=nameLIKE'+EncodedSelectedText+'%5EORasset_tagLIKE'+EncodedSelectedText+'%5EORserial_numberLIKE'+EncodedSelectedText+'%5EORfqdnLIKE'+EncodedSelectedText+'%5EORdns_domainLIKE'+EncodedSelectedText, index: tab.index + 1
            });
        break;
        case "teleChild":
            formatPhoneNumber(info);
            var EncodedSelectedText4Tele = encodeURIComponent(formattedPhoneNumber);
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=phoneLIKE'+EncodedSelectedText4Tele+'%5EORmobile_phoneLIKE'+EncodedSelectedText4Tele+'%5EORhome_phoneLIKE'+EncodedSelectedText4Tele, index: tab.index + 1
            });
        break;
        case "global":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/$sn_global_search_results.do?sysparm_search='+EncodedSelectedText, index: tab.index + 1
            });
        break;
    }
});