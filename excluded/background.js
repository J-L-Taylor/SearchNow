/* global chrome */

/* jshint moz:true */
/* jshint esversion: 6*/

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

import * as regexPatterns from './utils/regexPatterns.js';
import * as eventListeners from './eventListeners.js';

// Initialize event listeners
eventListeners.setupEventListeners();

function autoSearch(info, tab){
  var encodedSelectedText = encodeURIComponent(info.selectionText).toString().trim();
  if (regexPatterns.KBRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=kb_view.do?sysparm_article=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.INCRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=incident.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.RITMRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sc_req_item.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.STASKRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sc_task.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.REQRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sc_request.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.CALLRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=new_call.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.PRBRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=problem.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.CHGRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=change_request.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.SECRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=u_security_inc.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.CHATRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=chat_queue_entry.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.IPv4RegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci.do?sysparm_query=ip_address=' + encodedSelectedText + '%5Esys_class_name%3Dcmdb_ci_computer', index: tab.index + 1
      });
  } else if (regexPatterns.EmailRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user_list.do?sysparm_query=emailLIKE' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.HostnameRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci_computer_list.do?sysparm_query=nameLIKE' + encodedSelectedText + '%5EORasset_tagLIKE' + encodedSelectedText + '%5EORserial_numberLIKE' + encodedSelectedText + '%5EORfqdnLIKE' + encodedSelectedText + '%5EORdns_domainLIKE' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.TeleRegExPattern.test(info.selectionText)) {
    var cleaned = ('' + info.selectionText).trim().replace(/\D/g, '');
    var match = cleaned.match(/\d/g);
    if(match){
      var formattedPhoneNumber = info.selectionText
      if (match.length == 11) {
        formattedPhoneNumber = ['(', match[1], match[2], match[3], ') ', match[4], match[5], match[6], '-', match[7], match[8], match[9],   match[10]].join('');
      } else if (match.length == 10) {
        formattedPhoneNumber = ['(', match[0], match[1], match[2], ') ', match[3], match[4], match[5], '-', match[6], match [7], match[8], match[9]].join('');
      } else if (match.length == 7) {
        formattedPhoneNumber = [match[0], match[1], match[2], '-', match[3], match[4], match[5], match[6]].join ('');
      } else {
          console.log(info.selectionText + ' is not a valid telephone number.');
      }
      console.log(formattedPhoneNumber);
      var encodedSelectedText = encodeURIComponent(formattedPhoneNumber);
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user_list.do?sysparm_query=phoneLIKE' + encodedSelectedText + '%5EORmobile_phoneLIKE' + encodedSelectedText + '%5EORhome_phoneLIKE' + encodedSelectedText, index: tab.index + 1
      });
  } else {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=$sn_global_search_results.do?sysparm_search=' + encodedSelectedText, index: tab.index + 1
      });
  }
}}

function autoNav(info, tab){
  var encodedSelectedText = encodeURIComponent(info.selectionText).toString().trim();
  if (regexPatterns.KBRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=kb_view.do?sysparm_article=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.CALLRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=new_call.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.CatchAllTicketNumRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.IPv4RegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci_ip_address.do?sysparm_query=ip_address=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.EmailRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user.do?sysparm_query=email=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.HostnameRegExPattern.test(info.selectionText)) {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=cmdb_ci_computer.do?sysparm_query=name=' + encodedSelectedText, index: tab.index + 1
      });
  } else if (regexPatterns.TeleRegExPattern.test(info.selectionText)) {
    var cleaned = ('' + info.selectionText).trim().replace(/\D/g, '');
    var match = cleaned.match(/\d/g);
    if(match){
      var formattedPhoneNumber = info.selectionText
      if (match.length == 11) {
        formattedPhoneNumber = ['(', match[1], match[2], match[3], ') ', match[4], match[5], match[6], '-', match[7], match[8], match[9],   match[10]].join('');
      } else if (match.length == 10) {
        formattedPhoneNumber = ['(', match[0], match[1], match[2], ') ', match[3], match[4], match[5], '-', match[6], match [7], match[8], match[9]].join('');
      } else if (match.length == 7) {
        formattedPhoneNumber = [match[0], match[1], match[2], '-', match[3], match[4], match[5], match[6]].join ('');
      } else {
          console.log(info.selectionText + ' is not a valid telephone number.');
      }
      console.log(formattedPhoneNumber);
      var encodedSelectedText = encodeURIComponent(formattedPhoneNumber);
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user_list.do?sysparm_query=phoneLIKE' + encodedSelectedText + '%5EORmobile_phoneLIKE' + encodedSelectedText + '%5EORhome_phoneLIKE' + encodedSelectedText, index: tab.index + 1
    });
  } else {
      chrome.tabs.create({
          url: 'https://gsa.servicenowservices.com/nav_to.do?uri=$sn_global_search_results.do?sysparm_search=' + encodedSelectedText, index: tab.index + 1
      });
  }
}}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    var encodedSelectedText = encodeURIComponent(info.selectionText).toString();
    switch (info.menuItemId) {
        case "autoNavTo":
            autoNav(info, tab);
        break;
        case "autoSearch":
            autoSearch(info, tab);
        break;
        case "kbChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/$knowledge.do?sysparm_type_filter=all&sysparm_order=relevancy&query=' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "incChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/incident_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "ritmChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sc_req_item_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "staskChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sc_task_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "reqChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sc_request_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "callChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/new_call_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "prbChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/problem_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "chgChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/change_request_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "secChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/u_security_inc_list.do?sysparm_query=123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "chatChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/chat_queue_entry_list.do?sysparm_query=%5EGOTO123TEXTQUERY321%3D' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "ipv4Child":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/cmdb_ci_list.do?sysparm_query=ip_addressLIKE' + encodedSelectedText + '%5Esys_class_name%3Dcmdb_ci_computer', index: tab.index + 1
            });
        break;
        case "emailChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=emailLIKE' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "hostnameChild":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/cmdb_ci_computer_list.do?sysparm_query=nameLIKE' + encodedSelectedText + '%5EORasset_tagLIKE' + encodedSelectedText + '%5EORserial_numberLIKE' + encodedSelectedText + '%5EORfqdnLIKE' + encodedSelectedText + '%5EORdns_domainLIKE' + encodedSelectedText, index: tab.index + 1
            });
        break;
        case "teleChild":
          var cleaned = ('' + info.selectionText).trim().replace(/\D/g, '');
          var match = cleaned.match(/\d/g);
          if(match){
            var formattedPhoneNumber = info.selectionText
            if (match.length == 11) {
              formattedPhoneNumber = ['(', match[1], match[2], match[3], ') ', match[4], match[5], match[6], '-', match[7], match[8], match[9],   match[10]].join('');
            } else if (match.length == 10) {
              formattedPhoneNumber = ['(', match[0], match[1], match[2], ') ', match[3], match[4], match[5], '-', match[6], match [7], match[8], match[9]].join('');
            } else if (match.length == 7) {
              formattedPhoneNumber = [match[0], match[1], match[2], '-', match[3], match[4], match[5], match[6]].join ('');
            } else {
                console.log(info.selectionText + ' is not a valid telephone number.');
            }
            console.log(formattedPhoneNumber);
            var encodedSelectedText = encodeURIComponent(formattedPhoneNumber);
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/nav_to.do?uri=sys_user_list.do?sysparm_query=phoneLIKE' + encodedSelectedText + '%5EORmobile_phoneLIKE' + encodedSelectedText +      '%5EORhome_phoneLIKE' + encodedSelectedText, index: tab.index + 1
            });
          } else {
              chrome.tabs.create({
                  url: 'https://gsa.servicenowservices.com/nav_to.do?uri=$sn_global_search_results.do?sysparm_search=' + encodedSelectedText, index: tab.index + 1
              });
          }
            var encodedSelectedText4Tele = encodeURIComponent(formattedPhoneNumber);
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=phoneLIKE' + encodedSelectedText4Tele + '%5EORmobile_phoneLIKE' + encodedSelectedText4Tele + '%5EORhome_phoneLIKE' + encodedSelectedText4Tele, index: tab.index + 1
            });
        break;
        case "global":
            chrome.tabs.create({
                url: 'https://gsa.servicenowservices.com/$sn_global_search_results.do?sysparm_search=' + encodedSelectedText, index: tab.index + 1
            });
        break;
    }
});