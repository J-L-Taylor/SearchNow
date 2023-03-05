const topAndSecondLevelOfURL = "https://gsa.servicenowservices.com/nav_to.do?uri=";
const tableOfURL = "task.do";
const fragmentOfURL = "?sysparm_query=number=";
const fullEncodedURL = encodeURIComponent(topAndSecondLevelOfURL+tableOfURL+fragmentOfURL);



avascript: for ( ; ; ) {timeout=prompt("Set timeout [s]"); current=location.href; if(timeout>0) setTimeout('reload()',1000*timeout); else location.replace(current); function reload(){ setTimeout('reload()',1000*timeout); fr4me='<frameset cols=\'*\'>\n<frame src=\''+current+'\'/>'; fr4me+='</frameset>'; with(document){write(fr4me);void(close())}; }}


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


https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number=


var selectedText = info.selectionText;
var EncodedSelectedText = encodeURIComponent(selectedText).toString();
if (KBRegExPattern.test(selectedText)) {
    let url = 'https://gsa.servicenowservices.com/kb_view.do?sysparm_article='+EncodedSelectedText
} else if (INCRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/incident_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = INCRegExPattern
} else if (RITMRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sc_req_item_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = RITMRegExPattern
} else if (STASKRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sc_task_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = STASKRegExPattern
} else if (REQRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sc_request_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = REQRegExPattern
} else if (CALLRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/new_call_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = CALLRegExPattern
} else if (PRBRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/problem_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = PRBRegExPattern
} else if (CHGRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/change_request_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (SECRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/u_security_inc_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (CHATRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/chat_queue_entry_list.do?sysparm_query=%5EGOTO123TEXTQUERY321%3D'+EncodedSelectedText
        let RegExMatcher = 
} else if (IPv4RegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/cmdb_ci_list.do?sysparm_query=ip_addressLIKE'+EncodedSelectedText+'%5Esys_class_name%3Dcmdb_ci_computer'
        let RegExMatcher = 
} else if (EmailRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=emailLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (HostnameRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/cmdb_ci_computer_list.do?sysparm_query=nameLIKE'+EncodedSelectedText+'%5EORasset_tagLIKE'+EncodedSelectedText+'%5EORserial_numberLIKE'+EncodedSelectedText+'%5EORfqdnLIKE'+EncodedSelectedText+'%5EORdns_domainLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (TeleRegExPattern.test(selectedText)) {
        FormatPhoneNumber(info);
        let EncodedSelectedText = encodeURIComponent(FormattedPhoneNumber);
                let url = 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=phoneLIKE'+EncodedSelectedText+'%5EORmobile_phoneLIKE' +EncodedSelectedText+'%5EORhome_phoneLIKE'+EncodedSelectedText
        let RegExMatcher =         
} else {
    
        let url = 'https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number='+EncodedSelectedText
}