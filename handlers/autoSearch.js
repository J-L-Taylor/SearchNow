import * as regexPatterns from '../utils/regexPatterns.js';

export function autoSearch(info, tab) {
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