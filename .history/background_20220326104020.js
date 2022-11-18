/* eslint-disable no-undef */
/* jshint moz:true */
/* jshint esversion: 6*/
// @ts-nocheck
/*
Logic: 
When selected text is right-clicked and the context menu option is clicked, the selected text is evaluated against 13 regular expressions for a match, and if a match is found, the corresponding URL is opened in a new tab with the selected text set as the query string. If a match is not found, a global search is ran in a new tab with the selected text set as the query string.

Features to add: 
Clipboard integration: 
    Via hotkey - Press hotkey to set input variable equal to newest clipboard entry.
    Via right-click context menu entry - select to set input variable equal to newest clipboard entry.
Specify the search type instead of using the regex autosearch.
Convert a phone number with any formatting into a format of (###) ###-#### before searching for that phone number.
    myString = myString.replace(searchvalue, replacevalue);
► Quick shortcut(s) to SNow homepage
► Make URL this shortcut points to editable via Options.html
*/

var KBRegExPattern = /^KB\d{7}$/i;
var INCRegExPattern = /^INC\d{7}$/i;
var RITMRegExPattern = /^RITM\d{7}$/i;
var STASKRegExPattern = /^STASK\d{7}$/i;
var REQRegExPattern = /^REQ\d{7}$/i;
var CALLRegExPattern = /^CALL\d{7}$/i;
var PRBRegExPattern = /^PRB\d{7}$/i;
var CHGRegExPattern = /^CHG\d{7}$/i;
var SECRegExPattern = /^SEC\d{7}$/i;
var CHATRegExPattern = /^CHAT\d{7}$/i;
// var BSCREGExPattern = /^BSC\d{9}$/;
var IPv4RegExPattern = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i;
var EmailRegExPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var HostnameRegExPattern = /[A-Za-z0-9]{6}[-][A-Za-z0-9]{7}/;
var TeleRegExPattern = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/;

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'regexSearch',
      title: 'AutoSearch',
      type: 'normal',
      contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'kbChild',
        title: 'KB',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'incChild',
        title: 'INC',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'ritmChild',
        title: 'RITM',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'staskChild',
        title: 'STASK',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'reqChild',
        title: 'REQ',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'callChild',
        title: 'CALL',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'prbChild',
        title: 'PRB',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'chgChild',
        title: 'CHG',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'secChild',
        title: 'SEC',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'chatChild',
        title: 'CHAT',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'ipv4Child',
        title: 'IPv4',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'emailChild',
        title: 'Email',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'hostnameChild',
        title: 'Hostname',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'teleChild',
        title: 'Phone number',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
    chrome.contextMenus.create({
        id: 'global',
        title: 'Global',
        type: 'normal',
        contexts: ['selection']
    }, onCreated);
});

function onCreated() {
    if (chrome.runtime.lastError) {
      console.log(`Error: ${chrome.runtime.lastError}`);
    } else {
      console.log("Item created successfully");
    }
}

function FormatPhoneNumber(info) {
    var SelectedText = info.selectionText;
    let cleaned = ('' + SelectedText).replace(/\D/g, '');
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    let FormattedPhoneNumber = ['(', match[2], ') ', match[3], '-', match[4]].join('');
    return FormattedPhoneNumber;
}

function AutoSearch(info, tab){
    var SelectedText = info.selectionText;
    var EncodedSelectedText = encodeURIComponent(SelectedText).toString();
    if (KBRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
        url: 'https://gsa.servicenowservices.com/kb_view.do?sysparm_article='+EncodedSelectedText, index: tab.index + 1
        });
    } else if (INCRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/incident_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (RITMRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/sc_req_item_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (STASKRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/sc_task_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (REQRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/sc_request_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (CALLRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/new_call_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (PRBRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/problem_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (CHGRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/change_request_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (SECRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/u_security_inc_list.do?sysparm_query=numberLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (CHATRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/chat_queue_entry_list.do?sysparm_query=%5EGOTO123TEXTQUERY321%3D'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (IPv4RegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/cmdb_ci_list.do?sysparm_query=ip_addressLIKE'+EncodedSelectedText+'%5Esys_class_name%3Dcmdb_ci_computer'
        });
    } else if (EmailRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=emailLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (HostnameRegExPattern.test(SelectedText)) {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/cmdb_ci_computer_list.do?sysparm_query=nameLIKE'+EncodedSelectedText+'%5EORasset_tagLIKE'+EncodedSelectedText+'%5EORserial_numberLIKE'+EncodedSelectedText+'%5EORfqdnLIKE'+EncodedSelectedText+'%5EORdns_domainLIKE'+EncodedSelectedText, index: tab.index + 1
        });
    } else if (TeleRegExPattern.test(SelectedText)) {
        FormatPhoneNumber(info);
        let EncodedSelectedText = encodeURIComponent(FormattedPhoneNumber);
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
        case "regexSearch":
            AutoSearch(info, tab);
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
            FormatPhoneNumber(info);
            var EncodedSelectedText4Tele = encodeURIComponent(FormattedPhoneNumber);
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

chrome.commands.onCommand.addListener((command) => {
    if (command == 'AutoSearch'){
        AutoSearch(info);
    }
  });