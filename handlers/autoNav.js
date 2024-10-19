import * as regexPatterns from '../utils/regexPatterns.js';

export function autoNav(info, tab) {
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